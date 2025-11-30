#!/bin/bash

# Appwrite TMDB Proxy Deployment Helper Script
# This script helps you deploy the TMDB proxy function to Appwrite

echo "🚀 Appwrite TMDB Proxy Deployment Helper"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if appwrite CLI is installed
if ! command -v appwrite &> /dev/null; then
    echo -e "${RED}❌ Appwrite CLI is not installed${NC}"
    echo "Install it with: npm install -g appwrite-cli"
    echo "Or follow the manual setup in APPWRITE_PROXY_SETUP.md"
    exit 1
fi

echo -e "${GREEN}✅ Appwrite CLI is installed${NC}"
echo ""

# Check if logged in
echo "Checking Appwrite login status..."
if ! appwrite account get &> /dev/null; then
    echo -e "${YELLOW}⚠️  You need to login to Appwrite${NC}"
    echo "Running: appwrite login"
    appwrite login
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Login failed${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ You are logged in${NC}"
echo ""

# Get project ID
echo -e "${YELLOW}📋 Please enter your Appwrite Project ID:${NC}"
echo "(Find it in: Appwrite Console > Your Project > Settings > Project ID)"
read -p "Project ID: " PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}❌ Project ID is required${NC}"
    exit 1
fi

# Set project
appwrite client setEndpoint https://cloud.appwrite.io/v1
appwrite client setProject $PROJECT_ID

echo ""
echo -e "${GREEN}✅ Project set to: $PROJECT_ID${NC}"
echo ""

# Create function
echo "Creating function..."
FUNCTION_ID=$(appwrite functions create \
    --functionId "tmdb-proxy-$(date +%s)" \
    --name "tmdb-proxy" \
    --runtime "node-18.0" \
    --execute "any" \
    --timeout 15 \
    2>&1 | grep -o 'tmdb-proxy-[0-9]*' | head -1)

if [ -z "$FUNCTION_ID" ]; then
    echo -e "${RED}❌ Failed to create function${NC}"
    echo "Please create the function manually using APPWRITE_PROXY_SETUP.md"
    exit 1
fi

echo -e "${GREEN}✅ Function created: $FUNCTION_ID${NC}"
echo ""

# Add environment variable
echo "Adding TMDB API key as environment variable..."
appwrite functions updateVariable \
    --functionId "$FUNCTION_ID" \
    --key "TMDB_API_KEY" \
    --value "38bd6d8c1feb7cb89f8242e799e838b4"

echo -e "${GREEN}✅ Environment variable added${NC}"
echo ""

# Deploy function
echo "Deploying function code..."
cd appwrite-functions/tmdb-proxy

appwrite functions deployWithPATH \
    --functionId "$FUNCTION_ID" \
    --activate true \
    --code .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Deployment failed${NC}"
    echo "Please deploy manually using the Appwrite Console"
    exit 1
fi

cd ../..

echo ""
echo -e "${GREEN}✅ Function deployed successfully!${NC}"
echo ""
echo "========================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "========================================"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Add this to your .env file:"
echo "   VITE_APPWRITE_FUNCTION_URL=https://cloud.appwrite.io/v1/functions/$FUNCTION_ID/executions"
echo ""
echo "2. Restart your dev server:"
echo "   npm run dev"
echo ""
echo "3. Test your app - it should now use the proxy!"
echo ""
echo "📊 Function Details:"
echo "   - Function ID: $FUNCTION_ID"
echo "   - URL: https://cloud.appwrite.io/v1/functions/$FUNCTION_ID/executions"
echo ""
echo "🔍 Monitor executions at:"
echo "   https://cloud.appwrite.io/console/project-$PROJECT_ID/functions/function-$FUNCTION_ID/executions"
echo ""
