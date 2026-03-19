#!/bin/bash
# ============================================
# Deploy Faulty Version (for demo purposes)
# ============================================
# This script deploys a broken version OUTSIDE Jenkins
# so you can visually show the failure before triggering rollback.
#
# Usage:
#   1. Make sure version.txt says "v1.02"
#   2. Make sure app/faulty.flag exists
#   3. Run: ./scripts/deploy-faulty.sh
#   4. Visit http://localhost:3000 → should show v1.02 Failed ❌
#   5. Go to Jenkins → click "Build Now" → rollback happens
#   6. Reload http://localhost:3000 → shows v1.01 Healthy ✅
# ============================================

echo "🔨 Building faulty image..."
docker build -t node-app:faulty -f docker/Dockerfile .

echo "🛑 Stopping current container..."
docker stop myapp || true
docker rm myapp || true

echo "🚀 Deploying faulty version..."
docker run -d -p 3000:3000 --name myapp node-app:faulty

echo ""
echo "✅ Faulty version deployed!"
echo "   Visit http://localhost:3000 to see the broken app"
echo "   Then go to Jenkins and click 'Build Now' to trigger rollback"
