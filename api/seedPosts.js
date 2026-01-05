import mongoose from "mongoose";
import Post from "./models/post.model.js";
import User from "./models/user.model.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from parent directory (root of project)
dotenv.config({ path: join(__dirname, "..", ".env") });

// Sample articles with rich content
const samplePosts = [
  {
    title: "Getting Started with React Hooks: A Comprehensive Guide",
    content: `<h2>Introduction to React Hooks</h2>
    <p>React Hooks revolutionized the way we write React components by allowing us to use state and other React features without writing a class. Since their introduction in React 16.8, hooks have become the standard way of building React applications.</p>
    
    <h3>Why Use Hooks?</h3>
    <p>Hooks solve several problems that developers faced with class components:</p>
    <ul>
      <li><strong>Simpler code:</strong> Hooks allow you to write functional components that are easier to read and test</li>
      <li><strong>Reusability:</strong> Custom hooks enable you to extract and reuse stateful logic</li>
      <li><strong>Better organization:</strong> Related code stays together instead of being split across lifecycle methods</li>
    </ul>
    
    <h3>Most Common Hooks</h3>
    <p><strong>useState</strong> - The most fundamental hook that lets you add state to functional components. It returns an array with the current state value and a function to update it.</p>
    <pre><code>const [count, setCount] = useState(0);</code></pre>
    
    <p><strong>useEffect</strong> - Handles side effects in your components like data fetching, subscriptions, or manually changing the DOM. It runs after every render by default.</p>
    <pre><code>useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);</code></pre>
    
    <h3>Best Practices</h3>
    <p>Always call hooks at the top level of your component, never inside loops, conditions, or nested functions. This ensures hooks are called in the same order each time a component renders, which is essential for React to correctly preserve state.</p>
    
    <p>When using useEffect, always specify dependencies in the dependency array to avoid infinite loops and ensure your effect runs only when needed.</p>`,
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    title: "Building Scalable REST APIs with Node.js and Express",
    content: `<h2>Designing Modern REST APIs</h2>
    <p>Building a robust and scalable REST API requires careful planning and adherence to best practices. In this guide, we'll explore how to create production-ready APIs using Node.js and Express.</p>
    
    <h3>Project Structure</h3>
    <p>A well-organized project structure is crucial for maintainability. Here's a recommended structure:</p>
    <pre><code>src/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  ├── utils/
  └── config/</code></pre>
    
    <h3>Essential Middleware</h3>
    <p>Every production API should include these middleware:</p>
    <ul>
      <li><strong>express.json()</strong> - Parse JSON request bodies</li>
      <li><strong>cors</strong> - Handle Cross-Origin Resource Sharing</li>
      <li><strong>helmet</strong> - Set security-related HTTP headers</li>
      <li><strong>morgan</strong> - HTTP request logger</li>
      <li><strong>express-rate-limit</strong> - Prevent abuse with rate limiting</li>
    </ul>
    
    <h3>Error Handling</h3>
    <p>Implement a centralized error handling mechanism using custom error classes and middleware. This ensures consistent error responses across your API.</p>
    
    <h3>Database Integration</h3>
    <p>Use an ODM like Mongoose for MongoDB or an ORM like Sequelize for SQL databases. Always validate data at both the application and database levels.</p>
    
    <p>Remember to implement proper authentication and authorization, preferably using JWT tokens, and always sanitize user inputs to prevent injection attacks.</p>`,
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    title: "Mastering Tailwind CSS: From Basics to Advanced",
    content: `<h2>Why Tailwind CSS?</h2>
    <p>Tailwind CSS is a utility-first CSS framework that has transformed how developers approach styling. Instead of writing custom CSS, you compose designs using pre-defined utility classes directly in your HTML.</p>
    
    <h3>Core Concepts</h3>
    <p><strong>Utility-First Approach:</strong> Rather than semantic class names like .card or .button, you use utilities like flex, pt-4, and text-center to build your design.</p>
    
    <h3>Responsive Design</h3>
    <p>Tailwind makes responsive design intuitive with its mobile-first breakpoint system:</p>
    <pre><code>&lt;div class="w-full md:w-1/2 lg:w-1/3"&gt;
  Responsive width
&lt;/div&gt;</code></pre>
    
    <h3>Customization</h3>
    <p>The tailwind.config.js file is your playground for customization. Extend the default theme with your brand colors, fonts, and spacing:</p>
    <pre><code>module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#FF6363',
      }
    }
  }
}</code></pre>
    
    <h3>Performance Optimization</h3>
    <p>Tailwind's purge feature removes unused CSS in production, resulting in tiny file sizes. Configure it to scan your components and remove any unused classes.</p>
    
    <h3>Advanced Techniques</h3>
    <ul>
      <li>Using @apply to extract repeated patterns</li>
      <li>Creating custom variants with plugins</li>
      <li>Leveraging the JIT compiler for instant builds</li>
      <li>Dark mode support with the dark: variant</li>
    </ul>`,
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
  },
  {
    title: "Understanding JavaScript Closures and Scope",
    content: `<h2>What is a Closure?</h2>
    <p>A closure is one of JavaScript's most powerful features. It's a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned.</p>
    
    <h3>Lexical Scope</h3>
    <p>JavaScript uses lexical scoping, which means the scope of a variable is determined by where it's declared in the code, not where it's called from.</p>
    <pre><code>function outer() {
  const message = 'Hello';
  
  function inner() {
    console.log(message); // Can access 'message'
  }
  
  return inner;
}

const myFunc = outer();
myFunc(); // Prints 'Hello'</code></pre>
    
    <h3>Practical Use Cases</h3>
    <p><strong>Data Privacy:</strong> Closures enable private variables in JavaScript:</p>
    <pre><code>function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}</code></pre>
    
    <p><strong>Event Handlers:</strong> Closures are commonly used in event handlers to maintain state:</p>
    <pre><code>function attachClickHandler(element, id) {
  element.addEventListener('click', function() {
    console.log('Clicked element with id:', id);
  });
}</code></pre>
    
    <h3>Common Pitfalls</h3>
    <p>Be careful with closures in loops. The classic problem occurs when creating closures inside loops - they all reference the same variable:</p>
    <pre><code>// Wrong
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
} // Prints 5, 5, 5, 5, 5

// Correct
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
} // Prints 0, 1, 2, 3, 4</code></pre>`,
    category: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80",
  },
  {
    title: "MongoDB vs PostgreSQL: Choosing the Right Database",
    content: `<h2>The Database Dilemma</h2>
    <p>Choosing between MongoDB and PostgreSQL is one of the most important architectural decisions you'll make. Both are excellent databases, but they serve different purposes and excel in different scenarios.</p>
    
    <h3>MongoDB: Document-Oriented Power</h3>
    <p>MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It's schema-less, which means you can store documents with different structures in the same collection.</p>
    
    <p><strong>Best suited for:</strong></p>
    <ul>
      <li>Rapid development with evolving schemas</li>
      <li>Hierarchical data storage</li>
      <li>Handling large volumes of unstructured data</li>
      <li>Real-time analytics and high write loads</li>
    </ul>
    
    <h3>PostgreSQL: Relational Reliability</h3>
    <p>PostgreSQL is a powerful, open-source relational database that emphasizes extensibility and SQL compliance. It enforces data integrity through schemas and relationships.</p>
    
    <p><strong>Best suited for:</strong></p>
    <ul>
      <li>Complex queries with multiple joins</li>
      <li>Data integrity and ACID transactions</li>
      <li>Structured data with well-defined relationships</li>
      <li>Business intelligence and reporting</li>
    </ul>
    
    <h3>Performance Comparison</h3>
    <p>MongoDB generally performs better for read-heavy workloads with simple queries, while PostgreSQL excels at complex analytical queries with joins. However, actual performance depends heavily on your specific use case, indexing strategy, and query patterns.</p>
    
    <h3>Making the Decision</h3>
    <p>Consider PostgreSQL when you need strong data consistency, complex queries, and established relationships. Choose MongoDB when you need flexibility, horizontal scaling, and are dealing with diverse data types.</p>
    
    <p>Many modern applications use both - PostgreSQL for transactional data and MongoDB for caching, sessions, or analytics.</p>`,
    category: "Database",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
  },
  {
    title: "Modern Web Performance Optimization Techniques",
    content: `<h2>Why Performance Matters</h2>
    <p>Website performance directly impacts user experience, conversion rates, and SEO rankings. Studies show that a 1-second delay in page load time can result in a 7% reduction in conversions.</p>
    
    <h3>Critical Rendering Path</h3>
    <p>Understanding the critical rendering path is essential for optimization. It's the sequence of steps the browser takes to render a page:</p>
    <ol>
      <li>Construct the DOM tree from HTML</li>
      <li>Construct the CSSOM tree from CSS</li>
      <li>Combine DOM and CSSOM into the render tree</li>
      <li>Calculate layout for all elements</li>
      <li>Paint pixels to the screen</li>
    </ol>
    
    <h3>Image Optimization</h3>
    <p>Images often account for 50-70% of page weight. Optimize them by:</p>
    <ul>
      <li>Using modern formats like WebP or AVIF</li>
      <li>Implementing lazy loading with loading="lazy"</li>
      <li>Serving responsive images with srcset</li>
      <li>Using CDNs for faster delivery</li>
      <li>Compressing images without sacrificing quality</li>
    </ul>
    
    <h3>Code Splitting and Bundling</h3>
    <p>Don't make users download code they don't need. Use dynamic imports to split your bundle:</p>
    <pre><code>const Component = lazy(() => import('./Component'));</code></pre>
    
    <h3>Caching Strategies</h3>
    <p>Implement effective caching headers to reduce repeat downloads:</p>
    <ul>
      <li><strong>Cache-Control:</strong> max-age for static assets</li>
      <li><strong>ETag:</strong> For validation-based caching</li>
      <li><strong>Service Workers:</strong> For offline capabilities</li>
    </ul>
    
    <h3>Measuring Performance</h3>
    <p>Use tools like Lighthouse, WebPageTest, and Chrome DevTools to measure and monitor performance. Focus on Core Web Vitals: LCP, FID, and CLS.</p>`,
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Building Real-Time Applications with WebSockets",
    content: `<h2>The Power of Real-Time Communication</h2>
    <p>WebSockets enable bidirectional, real-time communication between clients and servers. Unlike traditional HTTP requests, WebSockets maintain a persistent connection, allowing instant data exchange.</p>
    
    <h3>When to Use WebSockets</h3>
    <p>WebSockets are perfect for applications that require instant updates:</p>
    <ul>
      <li>Chat applications and messaging platforms</li>
      <li>Live sports scores and financial tickers</li>
      <li>Collaborative editing tools</li>
      <li>Real-time gaming</li>
      <li>IoT device monitoring</li>
    </ul>
    
    <h3>WebSocket Protocol</h3>
    <p>WebSocket starts as an HTTP request with an Upgrade header, then switches to the WebSocket protocol for full-duplex communication over a single TCP connection.</p>
    
    <h3>Implementation with Socket.io</h3>
    <p>Socket.io is the most popular WebSocket library that provides fallbacks and additional features:</p>
    <pre><code>// Server
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('message', (data) => {
    io.emit('message', data); // Broadcast to all
  });
});</code></pre>
    
    <pre><code>// Client
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  socket.emit('message', 'Hello!');
});

socket.on('message', (data) => {
  console.log(data);
});</code></pre>
    
    <h3>Scaling WebSocket Applications</h3>
    <p>When scaling horizontally, use Redis as a message broker to synchronize messages across multiple server instances. Socket.io provides a Redis adapter for this purpose.</p>
    
    <h3>Security Considerations</h3>
    <p>Always validate and sanitize data received through WebSockets. Implement authentication using JWT tokens, rate limiting to prevent abuse, and use wss:// (WebSocket Secure) in production.</p>`,
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Introduction to TypeScript: Type Safety for JavaScript",
    content: `<h2>Why TypeScript?</h2>
    <p>TypeScript is a superset of JavaScript that adds static type checking. It helps catch errors during development rather than at runtime, making your code more robust and maintainable.</p>
    
    <h3>Basic Types</h3>
    <p>TypeScript provides several built-in types:</p>
    <pre><code>// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array&lt;string&gt; = ["Alice", "Bob"];

// Tuples
let tuple: [string, number] = ["hello", 10];</code></pre>
    
    <h3>Interfaces and Types</h3>
    <p>Define custom types for your objects:</p>
    <pre><code>interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean; // Optional property
}

function getUser(id: number): User {
  // Implementation
  return { id, name: "John", email: "john@example.com" };
}</code></pre>
    
    <h3>Generics</h3>
    <p>Write reusable, type-safe functions and classes:</p>
    <pre><code>function identity&lt;T&gt;(arg: T): T {
  return arg;
}

const result = identity&lt;string&gt;("hello");
const number = identity&lt;number&gt;(42);</code></pre>
    
    <h3>Union and Intersection Types</h3>
    <pre><code>// Union - can be one type OR another
type Status = "pending" | "approved" | "rejected";

// Intersection - combines multiple types
type Admin = User & { permissions: string[] };</code></pre>
    
    <h3>Benefits in Large Projects</h3>
    <p>TypeScript shines in large codebases by providing:</p>
    <ul>
      <li>Better IDE support with autocomplete</li>
      <li>Easier refactoring</li>
      <li>Self-documenting code</li>
      <li>Reduced runtime errors</li>
    </ul>`,
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
  },
  {
    title: "Docker Fundamentals for Web Developers",
    content: `<h2>Containerization Basics</h2>
    <p>Docker revolutionized application deployment by packaging applications and their dependencies into containers. A container is a lightweight, standalone executable package that includes everything needed to run a piece of software.</p>
    
    <h3>Key Concepts</h3>
    <p><strong>Images:</strong> Read-only templates containing your application code, runtime, libraries, and dependencies. Think of them as blueprints.</p>
    
    <p><strong>Containers:</strong> Running instances of images. They're isolated from each other and the host system but can communicate through defined channels.</p>
    
    <h3>Creating a Dockerfile</h3>
    <p>A Dockerfile defines how to build your image:</p>
    <pre><code>FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]</code></pre>
    
    <h3>Essential Docker Commands</h3>
    <pre><code># Build an image
docker build -t myapp:1.0 .

# Run a container
docker run -p 3000:3000 -d myapp:1.0

# List running containers
docker ps

# Stop a container
docker stop &lt;container-id&gt;

# View logs
docker logs &lt;container-id&gt;</code></pre>
    
    <h3>Docker Compose</h3>
    <p>Define and run multi-container applications:</p>
    <pre><code>version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: secret</code></pre>
    
    <h3>Best Practices</h3>
    <ul>
      <li>Use specific image versions, not 'latest'</li>
      <li>Minimize layers by combining RUN commands</li>
      <li>Use .dockerignore to exclude unnecessary files</li>
      <li>Don't run containers as root</li>
      <li>Keep images small using multi-stage builds</li>
    </ul>`,
    category: "DevOps",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=80",
  },
  {
    title: "GraphQL vs REST: A Comprehensive Comparison",
    content: `<h2>API Design Paradigms</h2>
    <p>Choosing between GraphQL and REST is a crucial decision that affects how your frontend and backend communicate. Both have their strengths and ideal use cases.</p>
    
    <h3>REST: The Traditional Approach</h3>
    <p>REST (Representational State Transfer) has been the standard for API design for over two decades. It uses HTTP methods and URLs to perform operations on resources.</p>
    
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Simple and well-understood</li>
      <li>Cacheable with standard HTTP caching</li>
      <li>Good tooling and widespread support</li>
      <li>Stateless architecture</li>
    </ul>
    
    <p><strong>Challenges:</strong></p>
    <ul>
      <li>Over-fetching: Getting more data than needed</li>
      <li>Under-fetching: Need multiple requests for related data</li>
      <li>Versioning complexity</li>
    </ul>
    
    <h3>GraphQL: Query Precision</h3>
    <p>GraphQL lets clients specify exactly what data they need in a single request. It uses a strong type system to define API capabilities.</p>
    
    <pre><code>query {
  user(id: "123") {
    name
    email
    posts {
      title
      comments {
        text
        author
      }
    }
  }
}</code></pre>
    
    <p><strong>Advantages:</strong></p>
    <ul>
      <li>Get exactly what you request - no more, no less</li>
      <li>Single endpoint for all queries</li>
      <li>Strong typing and introspection</li>
      <li>Perfect for complex, nested data</li>
    </ul>
    
    <p><strong>Challenges:</strong></p>
    <ul>
      <li>Steeper learning curve</li>
      <li>Caching is more complex</li>
      <li>Query complexity can impact performance</li>
      <li>Requires specialized tooling</li>
    </ul>
    
    <h3>When to Use Each</h3>
    <p>Use REST for simple, resource-based APIs with straightforward requirements. Choose GraphQL when you have complex data relationships, need flexibility, or want to reduce network requests.</p>
    
    <p>Many companies use both - REST for public APIs and simple services, GraphQL for complex internal applications.</p>`,
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    title: "Mastering Git: Advanced Workflows and Best Practices",
    content: `<h2>Beyond Basic Git</h2>
    <p>While most developers know basic Git commands like commit, push, and pull, mastering advanced Git techniques can dramatically improve your workflow and collaboration.</p>
    
    <h3>Branching Strategies</h3>
    <p><strong>Git Flow:</strong> A robust model with master, develop, feature, release, and hotfix branches. Ideal for scheduled releases.</p>
    
    <p><strong>GitHub Flow:</strong> Simpler approach with main branch and feature branches. Perfect for continuous deployment.</p>
    
    <p><strong>Trunk-Based Development:</strong> Short-lived feature branches merged frequently to main. Requires strong CI/CD.</p>
    
    <h3>Essential Advanced Commands</h3>
    <pre><code># Interactive rebase to clean history
git rebase -i HEAD~3

# Cherry-pick specific commits
git cherry-pick &lt;commit-hash&gt;

# Stash changes temporarily
git stash save "work in progress"
git stash pop

# Find the commit that introduced a bug
git bisect start
git bisect bad  # Current version is bad
git bisect good v1.0  # v1.0 is good

# Clean up merged branches
git branch --merged | grep -v "\\*" | xargs -n 1 git branch -d</code></pre>
    
    <h3>Writing Great Commit Messages</h3>
    <p>Follow the conventional commits specification:</p>
    <pre><code>type(scope): subject

body

footer</code></pre>
    
    <p>Types include: feat, fix, docs, style, refactor, test, chore</p>
    
    <h3>Resolving Merge Conflicts</h3>
    <p>When conflicts occur, Git marks them in your files. Resolve manually or use merge tools:</p>
    <pre><code>git mergetool
# Or configure VS Code as merge tool
git config --global merge.tool vscode</code></pre>
    
    <h3>Git Hooks for Automation</h3>
    <p>Automate checks before commits or pushes:</p>
    <pre><code># .git/hooks/pre-commit
#!/bin/sh
npm run lint
npm test</code></pre>
    
    <h3>Best Practices</h3>
    <ul>
      <li>Commit early and often</li>
      <li>Write descriptive commit messages</li>
      <li>Never commit secrets or credentials</li>
      <li>Use .gitignore properly</li>
      <li>Pull before you push</li>
      <li>Keep commits atomic and focused</li>
    </ul>`,
    category: "Git",
    image:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
  },
  {
    title: "Securing Your Web Applications: Essential Practices",
    content: `<h2>Security First Mindset</h2>
    <p>Security should never be an afterthought. With cyber attacks becoming increasingly sophisticated, implementing proper security measures is crucial for protecting your users and your reputation.</p>
    
    <h3>Authentication and Authorization</h3>
    <p><strong>Never store passwords in plain text.</strong> Always hash passwords using bcrypt or Argon2:</p>
    <pre><code>const bcrypt = require('bcrypt');
const saltRounds = 10;

// Hashing
const hash = await bcrypt.hash(password, saltRounds);

// Verification
const match = await bcrypt.compare(password, hash);</code></pre>
    
    <p>Implement JWT tokens for stateless authentication, but store them securely and use short expiration times.</p>
    
    <h3>Input Validation and Sanitization</h3>
    <p>Never trust user input. Validate and sanitize everything:</p>
    <ul>
      <li>Use libraries like Joi or Yup for validation</li>
      <li>Sanitize HTML input to prevent XSS</li>
      <li>Use parameterized queries to prevent SQL injection</li>
      <li>Validate file uploads (type, size, content)</li>
    </ul>
    
    <h3>HTTPS Everywhere</h3>
    <p>Use HTTPS for all communications. Let's Encrypt provides free SSL certificates. Never transmit sensitive data over HTTP.</p>
    
    <h3>Security Headers</h3>
    <p>Implement essential security headers using helmet.js:</p>
    <pre><code>const helmet = require('helmet');
app.use(helmet());</code></pre>
    
    <p>Key headers include:</p>
    <ul>
      <li><strong>Content-Security-Policy:</strong> Prevents XSS attacks</li>
      <li><strong>X-Frame-Options:</strong> Prevents clickjacking</li>
      <li><strong>X-Content-Type-Options:</strong> Prevents MIME sniffing</li>
      <li><strong>Strict-Transport-Security:</strong> Enforces HTTPS</li>
    </ul>
    
    <h3>Rate Limiting</h3>
    <p>Prevent brute-force attacks and API abuse:</p>
    <pre><code>const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);</code></pre>
    
    <h3>CORS Configuration</h3>
    <p>Configure CORS properly to control which domains can access your API:</p>
    <pre><code>const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));</code></pre>
    
    <h3>Regular Updates</h3>
    <p>Keep all dependencies updated. Use tools like npm audit, Snyk, or Dependabot to identify and fix vulnerabilities.</p>`,
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    title: "Testing Strategies for Modern Web Applications",
    content: `<h2>Why Testing Matters</h2>
    <p>Automated testing is essential for maintaining code quality and catching bugs before they reach production. A comprehensive testing strategy includes unit tests, integration tests, and end-to-end tests.</p>
    
    <h3>The Testing Pyramid</h3>
    <p>The testing pyramid guides how many tests of each type you should write:</p>
    <ul>
      <li><strong>Unit Tests (70%):</strong> Fast, isolated tests for individual functions</li>
      <li><strong>Integration Tests (20%):</strong> Test how components work together</li>
      <li><strong>End-to-End Tests (10%):</strong> Test complete user workflows</li>
    </ul>
    
    <h3>Unit Testing with Jest</h3>
    <p>Jest is the most popular JavaScript testing framework:</p>
    <pre><code>describe('Calculator', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('throws error for invalid input', () => {
    expect(() => add('2', 3)).toThrow();
  });
});</code></pre>
    
    <h3>React Component Testing</h3>
    <p>Use React Testing Library to test components from a user's perspective:</p>
    <pre><code>import { render, screen, fireEvent } from '@testing-library/react';

test('button click increments counter', () => {
  render(&lt;Counter /&gt;);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});</code></pre>
    
    <h3>Integration Testing</h3>
    <p>Test API endpoints and database interactions:</p>
    <pre><code>describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John');
  });
});</code></pre>
    
    <h3>End-to-End Testing with Cypress</h3>
    <p>Cypress simulates real user interactions:</p>
    <pre><code>describe('Login Flow', () => {
  it('successfully logs in a user', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});</code></pre>
    
    <h3>Test Coverage</h3>
    <p>Aim for 80%+ coverage, but remember that 100% coverage doesn't guarantee bug-free code. Focus on testing critical paths and edge cases.</p>
    
    <h3>Continuous Integration</h3>
    <p>Run tests automatically on every commit using CI/CD pipelines. Configure GitHub Actions, GitLab CI, or Jenkins to run your test suite.</p>`,
    category: "Testing",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    title: "Building Progressive Web Apps: The Complete Guide",
    content: `<h2>What Are Progressive Web Apps?</h2>
    <p>Progressive Web Apps (PWAs) combine the best of web and mobile apps. They're installable, work offline, and provide a native app-like experience while remaining discoverable through search engines.</p>
    
    <h3>Core PWA Requirements</h3>
    <p>A PWA must have three essential components:</p>
    <ol>
      <li><strong>HTTPS:</strong> PWAs must be served over HTTPS for security</li>
      <li><strong>Service Worker:</strong> Enables offline functionality and caching</li>
      <li><strong>Web App Manifest:</strong> Provides installation information</li>
    </ol>
    
    <h3>Creating a Web App Manifest</h3>
    <pre><code>{
  "name": "My PWA",
  "short_name": "PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}</code></pre>
    
    <h3>Service Worker Basics</h3>
    <p>Service workers intercept network requests and enable offline functionality:</p>
    <pre><code>// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered', reg))
    .catch(err => console.error('SW error', err));
}

// sw.js - Cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});</code></pre>
    
    <h3>Caching Strategies</h3>
    <ul>
      <li><strong>Cache First:</strong> Check cache before network (good for static assets)</li>
      <li><strong>Network First:</strong> Try network, fallback to cache (good for dynamic content)</li>
      <li><strong>Stale While Revalidate:</strong> Serve cached version while fetching update</li>
    </ul>
    
    <h3>Push Notifications</h3>
    <p>Engage users even when they're not on your site:</p>
    <pre><code>// Request permission
const permission = await Notification.requestPermission();

// Subscribe to push
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: publicKey
});</code></pre>
    
    <h3>Benefits of PWAs</h3>
    <ul>
      <li>Increased engagement with push notifications</li>
      <li>Faster load times with caching</li>
      <li>Works offline or on poor connections</li>
      <li>No app store approval needed</li>
      <li>Automatic updates</li>
      <li>Smaller download size than native apps</li>
    </ul>
    
    <h3>Tools and Frameworks</h3>
    <p>Use Workbox for easier service worker management, or frameworks like Next.js that provide PWA support out of the box with plugins.</p>`,
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    title: "Microservices Architecture: Design Patterns and Best Practices",
    content: `<h2>Understanding Microservices</h2>
    <p>Microservices architecture breaks down applications into small, independent services that communicate through well-defined APIs. Each service focuses on a specific business capability and can be developed, deployed, and scaled independently.</p>
    
    <h3>Benefits of Microservices</h3>
    <ul>
      <li><strong>Scalability:</strong> Scale individual services based on demand</li>
      <li><strong>Technology Freedom:</strong> Use different languages/frameworks per service</li>
      <li><strong>Team Independence:</strong> Teams can work on services independently</li>
      <li><strong>Fault Isolation:</strong> Failures in one service don't bring down the entire system</li>
      <li><strong>Faster Deployment:</strong> Deploy services independently without coordinating releases</li>
    </ul>
    
    <h3>Key Design Patterns</h3>
    <p><strong>API Gateway Pattern:</strong> Single entry point that routes requests to appropriate microservices. Handles authentication, rate limiting, and request aggregation.</p>
    
    <p><strong>Service Discovery:</strong> Services register themselves and discover other services dynamically. Tools like Consul, Eureka, or Kubernetes services enable this.</p>
    
    <p><strong>Circuit Breaker:</strong> Prevents cascading failures by stopping requests to failing services:</p>
    <pre><code>// Using resilience4j
@CircuitBreaker(name = "userService", fallbackMethod = "fallbackGetUser")
public User getUser(String id) {
  return userServiceClient.getUser(id);
}

public User fallbackGetUser(String id, Exception e) {
  return new User(id, "Unknown");
}</code></pre>
    
    <h3>Communication Patterns</h3>
    <p><strong>Synchronous (REST/gRPC):</strong> Direct request-response, simple but creates tight coupling.</p>
    
    <p><strong>Asynchronous (Message Queues):</strong> Services communicate via message brokers like RabbitMQ or Kafka. Better for eventual consistency and loose coupling.</p>
    
    <h3>Data Management</h3>
    <p>Each microservice should own its database. Use:</p>
    <ul>
      <li><strong>Database per Service:</strong> Complete independence but complex queries</li>
      <li><strong>Saga Pattern:</strong> Manage distributed transactions across services</li>
      <li><strong>CQRS:</strong> Separate read and write models for better scalability</li>
      <li><strong>Event Sourcing:</strong> Store state changes as events</li>
    </ul>
    
    <h3>Challenges and Solutions</h3>
    <p><strong>Distributed Tracing:</strong> Use tools like Jaeger or Zipkin to track requests across services.</p>
    
    <p><strong>Monitoring:</strong> Implement centralized logging (ELK stack) and metrics (Prometheus + Grafana).</p>
    
    <p><strong>Testing:</strong> Requires contract testing, integration testing, and chaos engineering.</p>
    
    <h3>When NOT to Use Microservices</h3>
    <p>Don't start with microservices for small projects. Begin with a monolith and extract services as needed. Microservices add complexity that's only justified for large, complex applications with multiple teams.</p>`,
    category: "Architecture",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(async () => {
    console.log("MongoDB connected");

    // Delete all existing posts
    const deleteResult = await Post.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing posts`);

    // You'll need to replace this with your actual admin user ID
    // First, let's check if there's a user in the database
    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      console.log(
        "⚠️  No admin user found. Please create an admin user first."
      );
      console.log(
        "Run the app, sign up, and manually set isAdmin: true in the database for your user."
      );
      process.exit(1);
    }

    console.log(`Using admin user: ${adminUser.username} (${adminUser._id})`);

    // Create new posts with the admin user ID
    const postsToCreate = samplePosts.map((post) => ({
      ...post,
      userId: adminUser._id.toString(),
      slug: post.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, ""),
    }));

    const createdPosts = await Post.insertMany(postsToCreate);
    console.log(`✅ Successfully created ${createdPosts.length} new articles!`);

    console.log("\n📚 Created Articles:");
    createdPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.category})`);
    });

    mongoose.connection.close();
    console.log("\n✨ Database seeding completed!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
