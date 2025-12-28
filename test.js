const { chromium } = require('playwright');

async function testPortfolio() {
  console.log('Starting portfolio website test...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const errors = [];
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });
  
  // Listen for page errors
  page.on('pageerror', err => {
    errors.push(`Page Error: ${err.message}`);
  });
  
  try {
    // Navigate to the homepage
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log('Page loaded successfully!');
    
    // Check if main sections exist
    const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
    for (const section of sections) {
      const element = await page.$(`#${section}`);
      if (element) {
        console.log(`✓ Section #${section} found`);
      } else {
        console.log(`✗ Section #${section} NOT found`);
      }
    }
    
    // Check for navigation
    const nav = await page.$('nav');
    if (nav) {
      console.log('✓ Navigation found');
    }
    
    // Check for hero section
    const hero = await page.$('#home');
    if (hero) {
      console.log('✓ Hero section found');
    }
    
    // Check for contact form
    const form = await page.$('form');
    if (form) {
      console.log('✓ Contact form found');
    }
    
    // Wait for animations to complete
    await page.waitForTimeout(2000);
    
    // Report errors
    if (errors.length > 0) {
      console.log('\n--- Console Errors ---');
      errors.forEach(err => console.log(err));
      console.log('----------------------\n');
    } else {
      console.log('✓ No console errors detected!');
    }
    
    console.log('\nTest completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
  }
}

testPortfolio();
