# BiblioDrop – Online Book Delivery Management System

BiblioDrop is a comprehensive full-stack digital platform that seamlessly connects avid readers, students, local libraries, and independent book owners. The platform democratizes access to books by allowing users to browse diverse collections, request secure doorstep delivery via integrated payment workflows, and manage reading pipelines, while giving librarians and administrators full analytical and quality controls over the entire ecosystem.

---

##  Problem Statement

Traditional library infrastructures and physical borrowing systems present operational and logistical challenges:

- **Physical Barriers:** Busy professionals, remote students, and individuals with limited mobility struggle to make physical library visits.
- **Underutilized Personal Assets:** Independent book owners and small community libraries lack a centralized marketplace to safely distribute, track, and monetize their underutilized inventories.
- **Fragmented Workflows:** The borrowing process is usually split across disjointed tracking tools, offline payment handling for delivery/late fees, and unverified review platforms that lead to trust deficits.

---

##  Solution & Impact

BiblioDrop solves these frictions by unifying interactive frontend workflows with robust server actions and secure API routes backed by Next.js and MongoDB.

### Who Benefits from This Platform?

- **Readers & Students (The Borrowers):** Instantly discover physical books from multiple local suppliers, issue secure checkout requests via **Stripe**, track delivery dispatches in real-time, and read verified reviews.
- **Libraries & Book Owners (The Providers):** Scale their geographic reach beyond physical neighborhoods, manage listings with a multi-part image upload infrastructure via **ImgBB API**, and track real-time revenue analytics.
- **Ecosystem Managers (The Admins):** Protect the marketplace from low-quality assets through a strict validation quarantine queue, govern user permission mappings, and track absolute platform transactions.

---

##  Project Links & Credentials

Below are the deployment endpoints, source code repositories, and secure testing accounts allocated for evaluating the platform architecture.

| Resource Component                        | Access Link / Location                                                           |
| :---------------------------------------- | :------------------------------------------------------------------------------- |
|  **Live Production Deployment**         | [👉 Visit BiblioDrop Live App](https://your-deployed-project.vercelapp)         |
|  **Client-Side Source Code (Frontend)** | [📦 GitHub Client Repository](https://github.com/yourusername/bibliodrop-client) |
|  **Server-Side API Code (Backend)**     | [🗄️ GitHub Server Repository](https://github.com/yourusername/bibliodrop-server) |

### 🔑 Verified Administrator Credentials

For evaluating system management grids, role modifications, and book queues, use the pre-seeded admin profile below:

- **Admin Email:** `admin@gmail.com`
- **Admin Password:** `Admin@123`

---

##  Key Architecture & Core Business Pipelines

###  1. Server-Side Pagination & Search Optimization

- **Database Slicing Engine:** The "Browse Books" page operates on an optimized database-level pagination model rendering exactly `6 to 12 items` (Default: 8) per page using MongoDB `.skip()` and `.limit()` queries to maximize retrieval speeds and avoid client-side memory bloating.
- **Advanced Query Channels:** Implements live case-insensitive regex searching across title/author fields coupled with strict compound filtering boundaries (Category classification, Price/Fee margins, and Availability status logs).

### 💳 2. Secured Financial Integration (Stripe Workflow)

- Bound to the **Stripe Checkout API** to handle immediate delivery fee allocations cleanly.
- Implements resilient automated lifecycle triggers: upon successful payment verification, the target asset status transitions safely to `Pending Delivery` inside the database.
- Features strict business logic guardrails blocking book owners/librarians from purchasing or requesting delivery on their own listings.

###  3. Verified Review Validation Network

- Implements a programmatic data guardrail where ratings, comments, and review submissions are strictly locked.
- The system intercepts incoming requests and grants write permissions **only** if the user possesses a verified transaction record explicitly marked as `Delivered` for that specific `bookId`.

###  4. Role-Based Access Control (RBAC Dashboard Ecosystem)

- **User Dashboard:** Renders analytics charts (Total Books Read, Total Spent) alongside interactive data tables tracking delivery logs, historical reads gallery, and active review management tools.
- **Librarian Dashboard:** Implements a direct multipart binary asset upload pipeline utilizing the **ImgBB API**. New books automatically enter a `Pending Approval` quarantine state. Librarians retain the authority to unpublish or delete approved listings.
- **Admin Dashboard:** Access absolute platform metrics (Total Users, Total Revenue, Total Deliveries) visualized with responsive **Recharts** pie and bar graphs. Processes the book approval queue, overrides system asset states, and reviews all global financial transactions.

---

##  Tech Stack & System Components

### Frontend Component Layer

- **Next.js (App Router):** Fast, production-ready React infrastructure utilizing optimized Turbopack compilation.
- **Better Auth:** Enterprise-grade secure session abstraction layer handling Credentials registration and Google OAuth mappings.
- **Tailwind CSS & HeroUI / DaisyUI:** Clean visual design matching a persistent custom CSS token dark/light mode engine (**Cream/Coffee Light** vs **Premium Teal/Cyber Glow Dark** layout tokens).
- **Framer Motion:** Staggered micro-interactions, spring animations, and smooth state layout transitions.
- **Recharts / Chart.js:** Responsive data visualization engine inside dashboards.
- **Lucide React & Gravity UI Icons:** Modern vector icon mapping sets.

### Backend Infrastructure Layer

- **Node.js & Express.js:** Scalable, isolated RESTful routing server architecture.
- **MongoDB Atlas:** Multi-tenant document database utilizing BSON structural indexing.
- **JSON Web Token (JWT):** Cookie-based validation pipeline safeguarding sensitive multi-part server actions and routes.

---

## 📂 Project Directory Breakdown

```text
src/
  ├── app/                  # Next.js App Router layout structure
  │    ├── (auth)/          # Authentication workflow scopes (Better Auth)
  │    ├── (main)/          # Core public application paths (Home, Browse)
  │    ├── dashboard/       # Role-separated layout engines (User, Librarian, Admin)
  │    └── api/             # Frontend boundary api proxies
  ├── components/           # UI Layer (Shared, Modules, and Feature Layouts)
  │    ├── shared/          # Reusable tokens (BookCard, Navbar, Footer)
  │    └── modules/         # Business units (BookFilter, Pagination)
  ├── lib/                  # Initialization adapters, client proxies, and helper hooks
  ├── models/               # Explicit database schema definitions (MongoDB structures)
  └── constants/            # Static configuration matrices, Zod evaluation shapes
```
