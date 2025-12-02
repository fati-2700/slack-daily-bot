// Script to verify that everything is configured correctly
require('dotenv').config();

console.log('🔍 Verifying configuration...\n');

let errors = 0;

// Check environment variables
console.log('📋 Environment variables:');
const requiredVars = {
  'SLACK_BOT_TOKEN': 'xoxb-',
  'SLACK_SIGNING_SECRET': '',
  'SLACK_APP_TOKEN': 'xapp-'
};

for (const [varName, prefix] of Object.entries(requiredVars)) {
  const value = process.env[varName];
  if (!value) {
    console.log(`  ❌ ${varName}: NOT CONFIGURED`);
    errors++;
  } else if (prefix && !value.startsWith(prefix)) {
    console.log(`  ⚠️  ${varName}: Incorrect format (must start with ${prefix})`);
    errors++;
  } else {
    const masked = value.substring(0, 10) + '...' + value.substring(value.length - 4);
    console.log(`  ✅ ${varName}: ${masked}`);
  }
}

// Check ports
console.log('\n🔌 Ports:');
const ports = {
  'PORT (Bot)': process.env.PORT || 3001,
  'API_PORT': process.env.API_PORT || 3002
};

for (const [name, port] of Object.entries(ports)) {
  console.log(`  📍 ${name}: ${port}`);
}

// Summary
console.log('\n' + '='.repeat(50));
if (errors === 0) {
  console.log('✅ Everything is configured correctly!');
  console.log('\n💡 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Verify you see: "⚡️ Slack bot is running!"');
  console.log('   3. In Slack, type: /daily');
} else {
  console.log(`❌ Found ${errors} error(s)`);
  console.log('\n💡 Check your .env file and make sure all variables are configured.');
  console.log('   See SETUP.md for more details.');
}
console.log('='.repeat(50));

process.exit(errors > 0 ? 1 : 0);

