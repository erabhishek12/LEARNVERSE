/* ═══════════════════════════════════════════════════════════════════════════
   LEARNVERSE ACADEMY - COMPLETE JAVASCRIPT
   Premium Course Selling Platform
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   1. CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

const CONFIG = {
    // Google Apps Script Web App URL (Replace with your deployed URL)
    API_URL: 'https://odd-poetry-8be4.erabhi186.workers.dev/',
    
    // Razorpay Key ID (Replace with your key)
    RAZORPAY_KEY: 'rzp_test_SDJVf0FkMO5XxH',
    
    // App Settings
    APP_NAME: 'LearnVerse Academy',
    CURRENCY: 'INR',
    CURRENCY_SYMBOL: '₹',
    
    // Token Settings
    TOKEN_EXPIRY: 5 * 60 * 1000, // 5 minutes in milliseconds
    SESSION_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    
    // Video Settings
    MAX_DEVICES: 2,
    WATERMARK_INTERVAL: 30000, // 30 seconds
    
    // Demo Mode (set to true for testing without backend)
    DEMO_MODE: false
};

/* ═══════════════════════════════════════════════════════════════════════════
   2. STATE MANAGEMENT
   ═══════════════════════════════════════════════════════════════════════════ */

const State = {
    // User State
    user: null,
    isAuthenticated: false,
    
    // Current Page
    currentPage: 'home',
    previousPage: null,
    
    // Course Data
    courses: [],
    featuredCourses: [],
    currentCourse: null,
    
    // Cart & Wishlist
    cart: [],
    wishlist: [],
    
    // Enrollments
    enrollments: [],
    
    // Filters
    filters: {
        category: [],
        level: [],
        duration: [],
        rating: null,
        priceRange: 5000,
        search: '',
        sort: 'popular'
    },
    
    // Pagination
    currentPageNum: 1,
    totalPages: 1,
    
    // Video Player
    currentLesson: null,
    currentSection: 0,
    videoToken: null,
    
    // UI State
    isLoading: false,
    isMobileMenuOpen: false,
    isSearchOpen: false,
    
    // Initialize state from localStorage
    init() {
        const savedUser = localStorage.getItem('learnverse_user');
        const savedCart = localStorage.getItem('learnverse_cart');
        const savedWishlist = localStorage.getItem('learnverse_wishlist');
        const savedTheme = localStorage.getItem('learnverse_theme');
        
        if (savedUser) {
            try {
                this.user = JSON.parse(savedUser);
                this.isAuthenticated = true;
            } catch (e) {
                localStorage.removeItem('learnverse_user');
            }
        }
        
        if (savedCart) {
            try {
                this.cart = JSON.parse(savedCart);
            } catch (e) {
                localStorage.removeItem('learnverse_cart');
            }
        }
        
        if (savedWishlist) {
            try {
                this.wishlist = JSON.parse(savedWishlist);
            } catch (e) {
                localStorage.removeItem('learnverse_wishlist');
            }
        }
        
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    },
    
    // Save user to localStorage
    saveUser() {
        if (this.user) {
            localStorage.setItem('learnverse_user', JSON.stringify(this.user));
        } else {
            localStorage.removeItem('learnverse_user');
        }
    },
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('learnverse_cart', JSON.stringify(this.cart));
    },
    
    // Save wishlist to localStorage
    saveWishlist() {
        localStorage.setItem('learnverse_wishlist', JSON.stringify(this.wishlist));
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   3. DEMO DATA (For testing without backend)
   ═══════════════════════════════════════════════════════════════════════════ */

const DemoData = {
    courses: [
        {
            id: 'course_001',
            title: 'Complete Web Development Bootcamp 2024',
            slug: 'complete-web-development-bootcamp',
            shortDescription: 'Learn HTML, CSS, JavaScript, React, Node.js and become a full-stack developer',
            description: `<p>Welcome to the Complete Web Development Bootcamp! This is the only course you need to learn web development and become a full-stack developer.</p>
            <p>With over 65 hours of HD video content, this course covers everything from basic HTML to advanced React.js and Node.js concepts. You'll build real projects that you can add to your portfolio.</p>
            <p>Whether you're a complete beginner or have some programming experience, this course will take your skills to the next level.</p>`,
            price: 499,
            originalPrice: 3999,
            discount: 88,
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop',
            instructor: 'Vikram Singh',
            instructorImage: 'https://i.pravatar.cc/200?img=12',
            instructorBio: 'Full Stack Developer with 10+ years of experience at Amazon & Microsoft. Taught 50,000+ students worldwide.',
            category: 'development',
            level: 'beginner',
            language: 'Hindi & English',
            totalLessons: 156,
            totalDuration: '65h 30m',
            rating: 4.9,
            reviewCount: 2456,
            enrolledCount: 12345,
            validity: 365,
            isFeatured: true,
            isPublished: true,
            whatYouLearn: [
                'Build 16+ real-world projects',
                'Master HTML, CSS, and JavaScript',
                'Learn React.js from scratch',
                'Build backend with Node.js & Express',
                'Work with MongoDB database',
                'Deploy websites to the cloud'
            ],
            requirements: [
                'No programming experience needed',
                'A computer with internet access',
                'Eagerness to learn'
            ],
            targetAudience: [
                'Anyone who wants to learn web development',
                'Beginners with no coding experience',
                'Developers looking to expand their skills'
            ],
            updatedAt: '2024-01-15'
        },
        {
            id: 'course_002',
            title: 'UI/UX Design Masterclass',
            slug: 'ui-ux-design-masterclass',
            shortDescription: 'Master UI/UX design from scratch using Figma, Adobe XD and design principles',
            description: '<p>Learn to design beautiful and functional user interfaces. This course covers everything from design fundamentals to advanced prototyping.</p>',
            price: 399,
            originalPrice: 2999,
            discount: 87,
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
            instructor: 'Aishwarya Rao',
            instructorImage: 'https://i.pravatar.cc/200?img=25',
            instructorBio: 'Former Design Lead at Swiggy. Passionate about creating beautiful user experiences.',
            category: 'design',
            level: 'beginner',
            language: 'English',
            totalLessons: 89,
            totalDuration: '32h 15m',
            rating: 4.8,
            reviewCount: 1823,
            enrolledCount: 8765,
            validity: 365,
            isFeatured: true,
            isPublished: true,
            whatYouLearn: [
                'Design stunning user interfaces',
                'Master Figma and Adobe XD',
                'Create interactive prototypes',
                'Understand UX research methods',
                'Build a professional portfolio'
            ],
            requirements: [
                'No prior design experience required',
                'Access to Figma (free)'
            ],
            targetAudience: [
                'Aspiring UI/UX designers',
                'Developers wanting design skills',
                'Entrepreneurs and product managers'
            ],
            updatedAt: '2024-01-10'
        },
        {
            id: 'course_003',
            title: 'Digital Marketing Pro',
            slug: 'digital-marketing-pro',
            shortDescription: 'Complete digital marketing course covering SEO, SEM, Social Media, and Analytics',
            description: '<p>Become a digital marketing expert. Learn SEO, Google Ads, Facebook Ads, Social Media Marketing, Email Marketing, and more.</p>',
            price: 599,
            originalPrice: 4999,
            discount: 88,
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
            instructor: 'Karthik Menon',
            instructorImage: 'https://i.pravatar.cc/200?img=33',
            instructorBio: 'Helped 100+ brands grow online. Google & Facebook certified professional.',
            category: 'marketing',
            level: 'intermediate',
            language: 'Hindi & English',
            totalLessons: 124,
            totalDuration: '48h 45m',
            rating: 4.7,
            reviewCount: 1456,
            enrolledCount: 6543,
            validity: 365,
            isFeatured: true,
            isPublished: true,
            whatYouLearn: [
                'Master SEO and rank on Google',
                'Run profitable Google Ads campaigns',
                'Create viral social media content',
                'Build email marketing funnels',
                'Analyze data with Google Analytics'
            ],
            requirements: [
                'Basic computer skills',
                'Willingness to learn'
            ],
            targetAudience: [
                'Marketing professionals',
                'Business owners',
                'Freelancers'
            ],
            updatedAt: '2024-01-12'
        },
        {
            id: 'course_004',
            title: 'Python for Data Science & AI',
            slug: 'python-data-science-ai',
            shortDescription: 'Learn Python programming for Data Science, Machine Learning, and Artificial Intelligence',
            description: '<p>Master Python for data science and AI. This course covers Python basics to advanced machine learning algorithms.</p>',
            price: 699,
            originalPrice: 5999,
            discount: 88,
            thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop',
            instructor: 'Neha Gupta',
            instructorImage: 'https://i.pravatar.cc/200?img=45',
            instructorBio: 'PhD from IIT. Working on AI/ML at leading tech companies for 8+ years.',
            category: 'development',
            level: 'intermediate',
            language: 'English',
            totalLessons: 185,
            totalDuration: '72h 30m',
            rating: 4.9,
            reviewCount: 2134,
            enrolledCount: 9876,
            validity: 365,
            isFeatured: true,
            isPublished: true,
            whatYouLearn: [
                'Python programming from scratch',
                'Data analysis with Pandas & NumPy',
                'Data visualization with Matplotlib',
                'Machine Learning with Scikit-learn',
                'Deep Learning with TensorFlow'
            ],
            requirements: [
                'Basic math knowledge',
                'No programming experience needed'
            ],
            targetAudience: [
                'Aspiring data scientists',
                'Analysts wanting to upgrade skills',
                'Developers interested in AI/ML'
            ],
            updatedAt: '2024-01-14'
        },
        {
            id: 'course_005',
            title: 'Business Strategy & Entrepreneurship',
            slug: 'business-strategy-entrepreneurship',
            shortDescription: 'Learn to build and scale a successful business from scratch',
            description: '<p>Learn proven business strategies to launch, grow, and scale your startup or business.</p>',
            price: 799,
            originalPrice: 6999,
            discount: 89,
            thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=450&fit=crop',
            instructor: 'Arjun Kapoor',
            instructorImage: 'https://i.pravatar.cc/200?img=52',
            instructorBio: 'Serial entrepreneur with 3 successful exits. Investor and mentor.',
            category: 'business',
            level: 'advanced',
            language: 'Hindi & English',
            totalLessons: 78,
            totalDuration: '28h 15m',
            rating: 4.8,
            reviewCount: 987,
            enrolledCount: 4321,
            validity: 365,
            isFeatured: false,
            isPublished: true,
            whatYouLearn: [
                'Develop a winning business idea',
                'Create a solid business plan',
                'Raise funding for your startup',
                'Build and lead a great team',
                'Scale your business successfully'
            ],
            requirements: [
                'Basic business understanding',
                'Entrepreneurial mindset'
            ],
            targetAudience: [
                'Aspiring entrepreneurs',
                'Small business owners',
                'Startup founders'
            ],
            updatedAt: '2024-01-08'
        },
        {
            id: 'course_006',
            title: 'Photography Masterclass',
            slug: 'photography-masterclass',
            shortDescription: 'Learn professional photography from basic to advanced techniques',
            description: '<p>Master the art of photography. From camera settings to post-processing, learn everything you need.</p>',
            price: 449,
            originalPrice: 3499,
            discount: 87,
            thumbnail: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=450&fit=crop',
            instructor: 'Ravi Sharma',
            instructorImage: 'https://i.pravatar.cc/200?img=57',
            instructorBio: 'Award-winning photographer with 15+ years of experience.',
            category: 'photography',
            level: 'beginner',
            language: 'Hindi',
            totalLessons: 65,
            totalDuration: '24h 30m',
            rating: 4.7,
            reviewCount: 876,
            enrolledCount: 3456,
            validity: 365,
            isFeatured: false,
            isPublished: true,
            whatYouLearn: [
                'Understand camera settings',
                'Master composition techniques',
                'Work with natural and artificial light',
                'Edit photos professionally',
                'Build your photography business'
            ],
            requirements: [
                'Any camera (DSLR or smartphone)'
            ],
            targetAudience: [
                'Photography enthusiasts',
                'Aspiring professional photographers',
                'Content creators'
            ],
            updatedAt: '2024-01-05'
        },
        {
            id: 'course_007',
            title: 'React.js Complete Guide',
            slug: 'reactjs-complete-guide',
            shortDescription: 'Master React.js including Hooks, Redux, and Next.js',
            description: '<p>Become a React.js expert. Learn everything from basics to advanced patterns including hooks, context, and Redux.</p>',
            price: 549,
            originalPrice: 4499,
            discount: 88,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
            instructor: 'Vikram Singh',
            instructorImage: 'https://i.pravatar.cc/200?img=12',
            instructorBio: 'Full Stack Developer with 10+ years of experience at Amazon & Microsoft.',
            category: 'development',
            level: 'intermediate',
            language: 'Hindi & English',
            totalLessons: 142,
            totalDuration: '52h 15m',
            rating: 4.9,
            reviewCount: 1876,
            enrolledCount: 7654,
            validity: 365,
            isFeatured: true,
            isPublished: true,
            whatYouLearn: [
                'React.js fundamentals and JSX',
                'React Hooks in depth',
                'State management with Redux',
                'Server-side rendering with Next.js',
                'Testing React applications'
            ],
            requirements: [
                'Basic JavaScript knowledge',
                'HTML & CSS fundamentals'
            ],
            targetAudience: [
                'JavaScript developers',
                'Frontend developers',
                'Full-stack developers'
            ],
            updatedAt: '2024-01-13'
        },
        {
            id: 'course_008',
            title: 'Financial Planning & Investment',
            slug: 'financial-planning-investment',
            shortDescription: 'Learn personal finance, investing in stocks, mutual funds, and building wealth',
            description: '<p>Take control of your finances. Learn to budget, invest, and build long-term wealth.</p>',
            price: 399,
            originalPrice: 2999,
            discount: 87,
            thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=450&fit=crop',
            instructor: 'Deepak Verma',
            instructorImage: 'https://i.pravatar.cc/200?img=60',
            instructorBio: 'Certified Financial Planner with 12+ years in wealth management.',
            category: 'finance',
            level: 'beginner',
            language: 'Hindi',
            totalLessons: 56,
            totalDuration: '18h 45m',
            rating: 4.8,
            reviewCount: 1234,
            enrolledCount: 5432,
            validity: 365,
            isFeatured: false,
            isPublished: true,
            whatYouLearn: [
                'Personal budgeting and savings',
                'Stock market investing',
                'Mutual funds and SIPs',
                'Tax planning strategies',
                'Retirement planning'
            ],
            requirements: [
                'No prior financial knowledge needed'
            ],
            targetAudience: [
                'Anyone wanting to improve finances',
                'Young professionals',
                'Parents planning for future'
            ],
            updatedAt: '2024-01-09'
        }
    ],
    
    lessons: {
        'course_001': [
            {
                sectionTitle: 'Getting Started',
                sectionOrder: 1,
                lessons: [
                    { id: 'lesson_001', title: 'Welcome to the Course', duration: '5:30', youtubeId: 'dQw4w9WgXcQ', isFree: true, order: 1 },
                    { id: 'lesson_002', title: 'Setting Up Your Environment', duration: '12:45', youtubeId: 'dQw4w9WgXcQ', isFree: true, order: 2 },
                    { id: 'lesson_003', title: 'Your First HTML Page', duration: '15:20', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 3 },
                    { id: 'lesson_004', title: 'Understanding Code Editors', duration: '10:15', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 4 },
                    { id: 'lesson_005', title: 'Browser Developer Tools', duration: '8:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 5 }
                ]
            },
            {
                sectionTitle: 'HTML Fundamentals',
                sectionOrder: 2,
                lessons: [
                    { id: 'lesson_006', title: 'HTML Document Structure', duration: '14:20', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 1 },
                    { id: 'lesson_007', title: 'Text Elements and Formatting', duration: '18:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 2 },
                    { id: 'lesson_008', title: 'Links and Navigation', duration: '12:15', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 3 },
                    { id: 'lesson_009', title: 'Images and Media', duration: '16:45', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 4 },
                    { id: 'lesson_010', title: 'Tables and Lists', duration: '20:10', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 5 },
                    { id: 'lesson_011', title: 'Forms and Input Elements', duration: '25:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 6 },
                    { id: 'lesson_012', title: 'Semantic HTML5', duration: '15:45', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 7 }
                ]
            },
            {
                sectionTitle: 'CSS Styling',
                sectionOrder: 3,
                lessons: [
                    { id: 'lesson_013', title: 'Introduction to CSS', duration: '12:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 1 },
                    { id: 'lesson_014', title: 'Selectors and Specificity', duration: '18:45', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 2 },
                    { id: 'lesson_015', title: 'Box Model Deep Dive', duration: '22:15', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 3 },
                    { id: 'lesson_016', title: 'Flexbox Layout', duration: '28:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 4 },
                    { id: 'lesson_017', title: 'CSS Grid Layout', duration: '32:20', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 5 },
                    { id: 'lesson_018', title: 'Responsive Design', duration: '24:15', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 6 }
                ]
            },
            {
                sectionTitle: 'JavaScript Basics',
                sectionOrder: 4,
                lessons: [
                    { id: 'lesson_019', title: 'Introduction to JavaScript', duration: '15:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 1 },
                    { id: 'lesson_020', title: 'Variables and Data Types', duration: '20:45', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 2 },
                    { id: 'lesson_021', title: 'Functions and Scope', duration: '25:15', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 3 },
                    { id: 'lesson_022', title: 'Arrays and Objects', duration: '28:30', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 4 },
                    { id: 'lesson_023', title: 'DOM Manipulation', duration: '32:20', youtubeId: 'dQw4w9WgXcQ', isFree: false, order: 5 }
                ]
            }
        ]
    },
    
    reviews: [
        {
            id: 'review_001',
            courseId: 'course_001',
            userId: 'user_001',
            userName: 'Ankit Verma',
            userImage: 'https://i.pravatar.cc/100?img=15',
            rating: 5,
            reviewText: 'This course is absolutely fantastic! Vikram explains everything so clearly and the projects are really helpful for building a portfolio. Highly recommended for anyone starting their web development journey.',
            createdAt: '2024-01-10',
            helpful: 24
        },
        {
            id: 'review_002',
            courseId: 'course_001',
            userId: 'user_002',
            userName: 'Priya Sharma',
            userImage: 'https://i.pravatar.cc/100?img=20',
            rating: 5,
            reviewText: 'Best web development course I\'ve ever taken! The progression from basics to advanced topics is perfect. I\'m now working as a frontend developer thanks to this course.',
            createdAt: '2024-01-05',
            helpful: 18
        },
        {
            id: 'review_003',
            courseId: 'course_001',
            userId: 'user_003',
            userName: 'Rohit Kumar',
            userImage: 'https://i.pravatar.cc/100?img=22',
            rating: 4,
            reviewText: 'Great content and well-structured course. The only thing I would like is more advanced topics. Overall, an excellent course for beginners.',
            createdAt: '2023-12-28',
            helpful: 12
        }
    ],
    
    categories: [
        { id: 'development', name: 'Development', icon: '💻', count: 15 },
        { id: 'design', name: 'Design', icon: '🎨', count: 12 },
        { id: 'marketing', name: 'Marketing', icon: '📈', count: 10 },
        { id: 'business', name: 'Business', icon: '💼', count: 8 },
        { id: 'photography', name: 'Photography', icon: '📷', count: 6 },
        { id: 'music', name: 'Music', icon: '🎵', count: 5 },
        { id: 'finance', name: 'Finance', icon: '💰', count: 7 },
        { id: 'fitness', name: 'Health & Fitness', icon: '💪', count: 4 }
    ]
};

/* ═══════════════════════════════════════════════════════════════════════════
   4. UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const Utils = {
    // Format price with currency
    formatPrice(price) {
        return `${CONFIG.CURRENCY_SYMBOL}${price.toLocaleString('en-IN')}`;
    },
    
    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    },
    
    // Format relative time
    formatRelativeTime(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    },
    
    // Generate unique ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Validate email
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validate phone
    isValidPhone(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(phone);
    },
    
    // Get password strength
    getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        if (strength <= 2) return 'weak';
        if (strength === 3) return 'fair';
        if (strength === 4) return 'good';
        return 'strong';
    },
    
    // Hash password (simple - use proper hashing in production)
    hashPassword(password) {
        // In production, use proper hashing on server-side
        return btoa(password);
    },
    
    // Generate device fingerprint
    getDeviceFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('LearnVerse', 2, 2);
        
        const navigator_info = [
            navigator.userAgent,
            navigator.language,
            screen.colorDepth,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset()
        ].join('|');
        
        return btoa(navigator_info + canvas.toDataURL());
    },
    
    // Calculate discount percentage
    calculateDiscount(original, discounted) {
        return Math.round(((original - discounted) / original) * 100);
    },
    
    // Truncate text
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },
    
    // Parse query string
    parseQueryString() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
        
        return params;
    },
    
    // Build query string
    buildQueryString(params) {
        return Object.keys(params)
            .filter(key => params[key] !== null && params[key] !== undefined && params[key] !== '')
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
    },
    
    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        }
    },
    
    // Smooth scroll to element
    scrollToElement(element, offset = 100) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    },
    
    // Scroll to top
    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   5. API SERVICE
   ═══════════════════════════════════════════════════════════════════════════ */

const API = {
    // Make API request
    async request(action, data = {}) {
        if (CONFIG.DEMO_MODE) {
            return this.handleDemoRequest(action, data);
        }
        
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action,
                    ...data,
                    userId: State.user?.id,
                    deviceId: Utils.getDeviceFingerprint()
                })
            });
            
            const result = await response.json();
            
            if (result.error) {
                throw new Error(result.error);
            }
            
            return result;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    // Handle demo requests (for testing)
    async handleDemoRequest(action, data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        switch (action) {
            case 'getCourses':
                return { success: true, courses: DemoData.courses };
            
            case 'getCourse':
                const course = DemoData.courses.find(c => c.id === data.courseId || c.slug === data.slug);
                return { success: true, course };
            
            case 'getLessons':
                const lessons = DemoData.lessons[data.courseId] || [];
                return { success: true, lessons };
            
            case 'getReviews':
                const reviews = DemoData.reviews.filter(r => r.courseId === data.courseId);
                return { success: true, reviews };
            
            case 'register':
                const newUser = {
                    id: Utils.generateId('user'),
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    createdAt: new Date().toISOString()
                };
                return { success: true, user: newUser };
            
            case 'login':
                // Demo login - accept any email/password
                const user = {
                    id: Utils.generateId('user'),
                    name: 'Demo User',
                    email: data.email,
                    phone: '9876543210',
                    createdAt: new Date().toISOString()
                };
                return { success: true, user };
            
            case 'getEnrollments':
                return { success: true, enrollments: [] };
            
            case 'createOrder':
                return {
                    success: true,
                    orderId: Utils.generateId('order'),
                    razorpayOrderId: 'order_' + Utils.generateId('rp')
                };
            
            case 'verifyPayment':
                return { success: true, enrollment: { id: Utils.generateId('enroll') } };
            
            case 'getVideoToken':
                return { 
                    success: true, 
                    token: Utils.generateId('token'),
                    youtubeId: 'dQw4w9WgXcQ' // Demo video
                };
            
            default:
                return { success: true };
        }
    },
    
    // Specific API methods
    async getCourses() {
        return this.request('getCourses');
    },
    
    async getCourse(courseId) {
        return this.request('getCourse', { courseId });
    },
    
    async getCourseBySlug(slug) {
        return this.request('getCourse', { slug });
    },
    
    async getLessons(courseId) {
        return this.request('getLessons', { courseId });
    },
    
    async getReviews(courseId) {
        return this.request('getReviews', { courseId });
    },
    
    async register(name, email, phone, password) {
        return this.request('register', { name, email, phone, password: Utils.hashPassword(password) });
    },
    
    async login(email, password) {
        return this.request('login', { email, password: Utils.hashPassword(password) });
    },
    
    async getEnrollments() {
        return this.request('getEnrollments');
    },
    
    async createOrder(courseId, couponCode = null) {
        return this.request('createOrder', { courseId, couponCode });
    },
    
    async verifyPayment(orderId, paymentId, signature) {
        return this.request('verifyPayment', { orderId, paymentId, signature });
    },
    
    async getVideoToken(lessonId, courseId) {
        return this.request('getVideoToken', { lessonId, courseId });
    },
    
    async markLessonComplete(lessonId, courseId) {
        return this.request('markLessonComplete', { lessonId, courseId });
    },
    
    async applyCoupon(code, courseId) {
        return this.request('applyCoupon', { code, courseId });
    }
};
/* ═══════════════════════════════════════════════════════════════════════════
   6. TOAST NOTIFICATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toast-container');
    },
    
    show(message, type = 'info', title = '', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
            <div class="toast-progress">
                <div class="toast-progress-bar" style="animation-duration: ${duration}ms"></div>
            </div>
        `;
        
        // Close button handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.dismiss(toast);
        });
        
        this.container.appendChild(toast);
        
        // Auto dismiss
        setTimeout(() => {
            this.dismiss(toast);
        }, duration);
        
        return toast;
    },
    
    dismiss(toast) {
        if (!toast || !toast.parentNode) return;
        
        toast.classList.add('toast-out');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    },
    
    success(message, title = 'Success') {
        return this.show(message, 'success', title);
    },
    
    error(message, title = 'Error') {
        return this.show(message, 'error', title);
    },
    
    warning(message, title = 'Warning') {
        return this.show(message, 'warning', title);
    },
    
    info(message, title = 'Info') {
        return this.show(message, 'info', title);
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   7. MODAL MANAGER
   ═══════════════════════════════════════════════════════════════════════════ */

const Modal = {
    activeModal: null,
    
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        // Close any open modal
        if (this.activeModal) {
            this.close(this.activeModal);
        }
        
        modal.classList.add('active');
        document.body.classList.add('no-scroll');
        this.activeModal = modalId;
        
        // Focus trap
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length) {
            focusableElements[0].focus();
        }
    },
    
    close(modalId = null) {
        const id = modalId || this.activeModal;
        if (!id) return;
        
        const modal = document.getElementById(id);
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Stop video if video modal
        if (id === 'video-modal') {
            const iframe = modal.querySelector('iframe');
            if (iframe) iframe.src = '';
        }
        
        this.activeModal = null;
    },
    
    confirm(title, message, onConfirm, onCancel = null) {
        const modal = document.getElementById('confirm-modal');
        if (!modal) return;
        
        document.getElementById('confirm-title').textContent = title;
        document.getElementById('confirm-message').textContent = message;
        
        const proceedBtn = document.getElementById('confirm-proceed');
        const cancelBtn = document.getElementById('confirm-cancel');
        
        // Remove old listeners
        const newProceedBtn = proceedBtn.cloneNode(true);
        const newCancelBtn = cancelBtn.cloneNode(true);
        proceedBtn.parentNode.replaceChild(newProceedBtn, proceedBtn);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
        
        // Add new listeners
        newProceedBtn.addEventListener('click', () => {
            this.close('confirm-modal');
            if (onConfirm) onConfirm();
        });
        
        newCancelBtn.addEventListener('click', () => {
            this.close('confirm-modal');
            if (onCancel) onCancel();
        });
        
        this.open('confirm-modal');
    },
    
    init() {
        // Close modal on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', () => this.close());
        });
        
        // Close modal on close button click
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   8. LOADING MANAGER
   ═══════════════════════════════════════════════════════════════════════════ */

const Loading = {
    screen: null,
    
    init() {
        this.screen = document.getElementById('loading-screen');
    },
    
    show() {
        if (this.screen) {
            this.screen.classList.remove('hidden');
        }
    },
    
    hide() {
        if (this.screen) {
            this.screen.classList.add('hidden');
        }
    },
    
    // Show loading on button
    buttonStart(button) {
        button.classList.add('loading');
        button.disabled = true;
    },
    
    buttonStop(button) {
        button.classList.remove('loading');
        button.disabled = false;
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   9. NAVIGATION & ROUTING
   ═══════════════════════════════════════════════════════════════════════════ */

const Router = {
    init() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigate(page);
            }
            
            const categoryLink = e.target.closest('[data-category]');
            if (categoryLink) {
                e.preventDefault();
                const category = categoryLink.dataset.category;
                State.filters.category = [category];
                this.navigate('courses');
            }
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, false);
            }
        });
        
        // Initial page load
        const params = Utils.parseQueryString();
        if (params.page) {
            this.showPage(params.page, false);
        }
    },
    
    navigate(page, data = {}) {
        State.previousPage = State.currentPage;
        
        // Store data if needed
        if (data.courseId) {
            State.currentCourse = DemoData.courses.find(c => c.id === data.courseId);
        }
        if (data.courseSlug) {
            State.currentCourse = DemoData.courses.find(c => c.slug === data.courseSlug);
        }
        
        this.showPage(page);
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        if (data.courseSlug) {
            url.searchParams.set('course', data.courseSlug);
        }
        window.history.pushState({ page, ...data }, '', url);
        
        // Scroll to top
        Utils.scrollToTop();
    },
    
    showPage(page, updateNav = true) {
        // Check authentication for protected pages
        const protectedPages = ['dashboard', 'my-courses', 'wishlist', 'certificates', 'settings', 'player', 'checkout'];
        if (protectedPages.includes(page) && !State.isAuthenticated) {
            Toast.warning('Please login to access this page');
            page = 'login';
        }
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`page-${page}`);
        if (targetPage) {
            targetPage.classList.add('active');
            State.currentPage = page;
        } else {
            // Show 404
            document.getElementById('page-404')?.classList.add('active');
            State.currentPage = '404';
        }
        
        // Update navigation
        if (updateNav) {
            this.updateNavigation(page);
        }
        
        // Load page content
        this.loadPageContent(page);
        
        // Show/hide navbar and footer for special pages
        this.updateLayout(page);
    },
    
    updateNavigation(page) {
        // Update nav links
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu
        UI.closeMobileMenu();
    },
    
    updateLayout(page) {
        const navbar = document.getElementById('navbar');
        const footer = document.getElementById('main-footer');
        
        const hideNavPages = ['login', 'register', 'player'];
        const hideFooterPages = ['login', 'register', 'player', 'dashboard'];
        
        if (navbar) {
            navbar.style.display = hideNavPages.includes(page) ? 'none' : '';
        }
        
        if (footer) {
            footer.style.display = hideFooterPages.includes(page) ? 'none' : '';
        }
    },
    
    loadPageContent(page) {
        switch (page) {
            case 'home':
                HomePage.init();
                break;
            case 'courses':
                CoursesPage.init();
                break;
            case 'course-detail':
                CourseDetailPage.init();
                break;
            case 'player':
                PlayerPage.init();
                break;
            case 'dashboard':
                DashboardPage.init();
                break;
            case 'checkout':
                CheckoutPage.init();
                break;
            case 'login':
            case 'register':
                AuthPage.init();
                break;
        }
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   10. UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

const UI = {
    init() {
        this.initNavbar();
        this.initThemeToggle();
        this.initSearch();
        this.initMobileMenu();
        this.initBackToTop();
        this.initAnimations();
        this.initFAQ();
        this.initTestimonials();
        this.updateAuthUI();
    },
    
    // Navbar
    initNavbar() {
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', Utils.throttle(() => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, 100));
    },
    
    // Theme Toggle
    initThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('learnverse_theme', newTheme);
        });
    },
    
    // Search
    initSearch() {
        const searchToggle = document.getElementById('search-toggle');
        const searchBox = document.getElementById('search-box');
        const searchInput = document.getElementById('search-input');
        const searchClose = document.getElementById('search-close');
        const searchResults = document.getElementById('search-results');
        
        if (!searchToggle || !searchBox) return;
        
        // Toggle search
        searchToggle.addEventListener('click', () => {
            searchBox.classList.add('active');
            searchInput.focus();
            State.isSearchOpen = true;
        });
        
        // Close search
        searchClose.addEventListener('click', () => {
            this.closeSearch();
        });
        
        // Search input
        searchInput.addEventListener('input', Utils.debounce((e) => {
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }
            
            const results = DemoData.courses.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query) ||
                course.instructor.toLowerCase().includes(query)
            ).slice(0, 5);
            
            this.renderSearchResults(results, searchResults);
        }, 300));
        
        // Keyboard shortcut (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchBox.classList.add('active');
                searchInput.focus();
            }
            
            if (e.key === 'Escape' && State.isSearchOpen) {
                this.closeSearch();
            }
        });
    },
    
    closeSearch() {
        const searchBox = document.getElementById('search-box');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        searchBox.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        State.isSearchOpen = false;
    },
    
    renderSearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-no-results">
                    <p>No courses found</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = results.map(course => `
            <div class="search-result-item" data-course-id="${course.id}">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div>
                    <div class="result-title">${course.title}</div>
                    <div class="result-category">${course.category}</div>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        container.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const courseId = item.dataset.courseId;
                const course = DemoData.courses.find(c => c.id === courseId);
                if (course) {
                    State.currentCourse = course;
                    Router.navigate('course-detail', { courseSlug: course.slug });
                    this.closeSearch();
                }
            });
        });
    },
    
    // Mobile Menu
    initMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        
        if (!toggle || !menu) return;
        
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            State.isMobileMenuOpen = !State.isMobileMenuOpen;
        });
        
        // Mobile dropdown toggles
        document.querySelectorAll('.mobile-dropdown-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                btn.nextElementSibling.classList.toggle('active');
            });
        });
    },
    
    closeMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        
        if (toggle) toggle.classList.remove('active');
        if (menu) menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        State.isMobileMenuOpen = false;
    },
    
    // Back to Top
    initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        
        window.addEventListener('scroll', Utils.throttle(() => {
            if (window.pageYOffset > 500) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }, 100));
        
        btn.addEventListener('click', () => {
            Utils.scrollToTop();
        });
    },
    
    // Scroll Animations
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Counter animation
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe animation elements
        document.querySelectorAll('.animate-fade-up, .animate-fade-left, .stagger-children, .counter').forEach(el => {
            observer.observe(el);
        });
    },
    
    animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (target - start) * easeOutQuart;
            
            if (target % 1 !== 0) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    },
    
    // FAQ Accordion
    initFAQ() {
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    },
    
    // Testimonials Slider
    initTestimonials() {
        const track = document.querySelector('.testimonial-track');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        
        if (!track || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        const totalSlides = document.querySelectorAll('.testimonial-card').length;
        
        const goToSlide = (index) => {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };
        
        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Auto-play
        setInterval(() => goToSlide(currentIndex + 1), 5000);
    },
    
    // Update Auth UI
    updateAuthUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const cartBtn = document.getElementById('cart-btn');
        const mobileAuth = document.getElementById('mobile-auth');
        
        if (State.isAuthenticated && State.user) {
            // Show user menu
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) {
                userMenu.style.display = 'block';
                document.getElementById('user-name').textContent = State.user.name.split(' ')[0];
                document.getElementById('user-fullname').textContent = State.user.name;
                document.getElementById('user-email').textContent = State.user.email;
                
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(State.user.name)}&background=6366f1&color=fff`;
                document.getElementById('user-avatar').src = avatarUrl;
                document.getElementById('user-avatar-lg').src = avatarUrl;
            }
            if (cartBtn) cartBtn.style.display = 'flex';
            if (mobileAuth) mobileAuth.style.display = 'none';
            
            // Update cart count
            this.updateCartCount();
        } else {
            // Show auth buttons
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
            if (cartBtn) cartBtn.style.display = 'none';
            if (mobileAuth) mobileAuth.style.display = 'flex';
        }
    },
    
    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = State.cart.length;
            cartCount.style.display = State.cart.length > 0 ? 'flex' : 'none';
        }
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   11. AUTHENTICATION
   ═══════════════════════════════════════════════════════════════════════════ */

const Auth = {
    async login(email, password) {
        try {
            const result = await API.login(email, password);
            
            if (result.success && result.user) {
                State.user = result.user;
                State.isAuthenticated = true;
                State.saveUser();
                
                // Load enrollments
                await this.loadEnrollments();
                
                UI.updateAuthUI();
                Toast.success('Welcome back!', 'Login Successful');
                
                // Redirect
                if (State.previousPage && State.previousPage !== 'login' && State.previousPage !== 'register') {
                    Router.navigate(State.previousPage);
                } else {
                    Router.navigate('dashboard');
                }
                
                return true;
            }
        } catch (error) {
            Toast.error(error.message || 'Login failed. Please try again.');
            return false;
        }
    },
    
    async register(name, email, phone, password) {
        try {
            const result = await API.register(name, email, phone, password);
            
            if (result.success && result.user) {
                State.user = result.user;
                State.isAuthenticated = true;
                State.saveUser();
                
                UI.updateAuthUI();
                Toast.success('Welcome to LearnVerse!', 'Registration Successful');
                
                Router.navigate('dashboard');
                return true;
            }
        } catch (error) {
            Toast.error(error.message || 'Registration failed. Please try again.');
            return false;
        }
    },
    
    logout() {
        Modal.confirm(
            'Logout',
            'Are you sure you want to logout?',
            () => {
                State.user = null;
                State.isAuthenticated = false;
                State.enrollments = [];
                localStorage.removeItem('learnverse_user');
                
                UI.updateAuthUI();
                Toast.info('You have been logged out');
                Router.navigate('home');
            }
        );
    },
    
    async loadEnrollments() {
        try {
            const result = await API.getEnrollments();
            if (result.success) {
                State.enrollments = result.enrollments || [];
            }
        } catch (error) {
            console.error('Failed to load enrollments:', error);
        }
    },
    
    isEnrolled(courseId) {
        return State.enrollments.some(e => e.courseId === courseId);
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   12. AUTH PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const AuthPage = {
    init() {
        this.initLoginForm();
        this.initRegisterForm();
        this.initPasswordToggles();
        this.initPasswordStrength();
    },
    
    initLoginForm() {
        const form = document.getElementById('login-form');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const submitBtn = document.getElementById('login-submit');
            
            // Validation
            if (!Utils.isValidEmail(email)) {
                this.showError('login-email', 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                this.showError('login-password', 'Password must be at least 6 characters');
                return;
            }
            
            // Submit
            Loading.buttonStart(submitBtn);
            await Auth.login(email, password);
            Loading.buttonStop(submitBtn);
        });
    },
    
    initRegisterForm() {
        const form = document.getElementById('register-form');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const phone = document.getElementById('register-phone').value.trim();
            const password = document.getElementById('register-password').value;
            const terms = document.getElementById('accept-terms').checked;
            const submitBtn = document.getElementById('register-submit');
            
            // Validation
            if (name.length < 2) {
                this.showError('register-name', 'Please enter your full name');
                return;
            }
            
            if (!Utils.isValidEmail(email)) {
                this.showError('register-email', 'Please enter a valid email address');
                return;
            }
            
            if (!Utils.isValidPhone(phone)) {
                this.showError('register-phone', 'Please enter a valid 10-digit phone number');
                return;
            }
            
            if (password.length < 8) {
                this.showError('register-password', 'Password must be at least 8 characters');
                return;
            }
            
            if (!terms) {
                Toast.warning('Please accept the terms and conditions');
                return;
            }
            
            // Submit
            Loading.buttonStart(submitBtn);
            await Auth.register(name, email, phone, password);
            Loading.buttonStop(submitBtn);
        });
    },
    
    initPasswordToggles() {
        document.querySelectorAll('.password-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                const eyeOpen = btn.querySelector('.eye-open');
                const eyeClosed = btn.querySelector('.eye-closed');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    eyeOpen.style.display = 'none';
                    eyeClosed.style.display = 'block';
                } else {
                    input.type = 'password';
                    eyeOpen.style.display = 'block';
                    eyeClosed.style.display = 'none';
                }
            });
        });
    },
    
    initPasswordStrength() {
        const passwordInput = document.getElementById('register-password');
        if (!passwordInput) return;
        
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = Utils.getPasswordStrength(password);
            
            // Update strength bar
            const strengthFill = document.querySelector('.strength-fill');
            const strengthText = document.querySelector('.strength-text');
            
            if (strengthFill) {
                strengthFill.className = 'strength-fill ' + strength;
            }
            if (strengthText) {
                strengthText.textContent = strength.charAt(0).toUpperCase() + strength.slice(1) + ' password';
            }
            
            // Update requirements
            this.updatePasswordRequirement('req-length', password.length >= 8);
            this.updatePasswordRequirement('req-upper', /[A-Z]/.test(password));
            this.updatePasswordRequirement('req-lower', /[a-z]/.test(password));
            this.updatePasswordRequirement('req-number', /[0-9]/.test(password));
        });
    },
    
    updatePasswordRequirement(id, isValid) {
        const el = document.getElementById(id);
        if (!el) return;
        
        el.classList.toggle('valid', isValid);
        el.querySelector('.req-icon').textContent = isValid ? '✓' : '○';
    },
    
    showError(inputId, message) {
        const errorEl = document.getElementById(`${inputId}-error`);
        const inputEl = document.getElementById(inputId);
        
        if (errorEl) {
            errorEl.textContent = message;
        }
        if (inputEl) {
            inputEl.parentElement.parentElement.classList.add('error');
            inputEl.focus();
            
            // Remove error on input
            inputEl.addEventListener('input', () => {
                inputEl.parentElement.parentElement.classList.remove('error');
                if (errorEl) errorEl.textContent = '';
            }, { once: true });
        }
    },
    
    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   13. HOME PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const HomePage = {
    init() {
        this.loadFeaturedCourses();
        this.initCategoryTabs();
        this.initHeroParallax();
        this.initNewsletterForm();
    },
    
    async loadFeaturedCourses() {
        const grid = document.getElementById('featured-course-grid');
        if (!grid) return;
        
        try {
            // Use demo data
            const courses = DemoData.courses.filter(c => c.isFeatured);
            State.featuredCourses = courses;
            
            this.renderCourses(courses, grid);
        } catch (error) {
            console.error('Failed to load courses:', error);
            grid.innerHTML = '<p class="error">Failed to load courses. Please try again.</p>';
        }
    },
    
    renderCourses(courses, container) {
        if (courses.length === 0) {
            container.innerHTML = '<p class="text-center text-secondary">No courses found.</p>';
            return;
        }
        
        container.innerHTML = courses.map(course => this.createCourseCard(course)).join('');
        
        // Add event listeners
        container.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.wishlist-icon') && !e.target.closest('.enroll-btn')) {
                    const courseId = card.dataset.courseId;
                    const course = DemoData.courses.find(c => c.id === courseId);
                    if (course) {
                        State.currentCourse = course;
                        Router.navigate('course-detail', { courseSlug: course.slug });
                    }
                }
            });
        });
        
        // Wishlist buttons
        container.querySelectorAll('.wishlist-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.closest('.course-card').dataset.courseId;
                this.toggleWishlist(courseId, btn);
            });
        });
        
        // Enroll buttons
        container.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.closest('.course-card').dataset.courseId;
                Cart.add(courseId);
            });
        });
    },
    
    createCourseCard(course) {
        const isWishlisted = State.wishlist.includes(course.id);
        
        return `
            <article class="course-card" data-course-id="${course.id}">
                <div class="card-image">
                    <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
                    <div class="card-overlay">
                        <span class="play-icon">▶</span>
                    </div>
                    <button class="wishlist-icon ${isWishlisted ? 'active' : ''}" aria-label="Add to wishlist">
                        <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    <span class="card-category">${course.category}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${course.title}</h3>
                    <div class="card-instructor">
                        <img src="${course.instructorImage}" alt="${course.instructor}" class="instructor-avatar">
                        <span class="instructor-name">${course.instructor}</span>
                    </div>
                    <div class="card-meta">
                        <span class="rating">⭐ ${course.rating} (${course.reviewCount.toLocaleString()})</span>
                        <span>${course.totalDuration}</span>
                    </div>
                    <div class="card-footer">
                        <div>
                            <span class="price">${Utils.formatPrice(course.price)}</span>
                            <span class="original-price">${Utils.formatPrice(course.originalPrice)}</span>
                        </div>
                        <button class="btn btn-primary btn-sm enroll-btn">Enroll Now</button>
                    </div>
                </div>
            </article>
        `;
    },
    
    toggleWishlist(courseId, btn) {
        if (!State.isAuthenticated) {
            Toast.warning('Please login to add to wishlist');
            Router.navigate('login');
            return;
        }
        
        const index = State.wishlist.indexOf(courseId);
        
        if (index === -1) {
            State.wishlist.push(courseId);
            btn.classList.add('active');
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
            Toast.success('Added to wishlist');
        } else {
            State.wishlist.splice(index, 1);
            btn.classList.remove('active');
            btn.querySelector('svg').setAttribute('fill', 'none');
            Toast.info('Removed from wishlist');
        }
        
        State.saveWishlist();
    },
    
    initCategoryTabs() {
        const tabs = document.querySelectorAll('#category-tabs .filter-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter courses
                const filter = tab.dataset.filter;
                let filteredCourses = DemoData.courses.filter(c => c.isFeatured);
                
                if (filter !== 'all') {
                    filteredCourses = filteredCourses.filter(c => c.category === filter);
                }
                
                const grid = document.getElementById('featured-course-grid');
                this.renderCourses(filteredCourses, grid);
            });
        });
    },
    
    initHeroParallax() {
        const heroCards = document.getElementById('hero-cards');
        if (!heroCards) return;
        
        document.addEventListener('mousemove', Utils.throttle((e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const moveX = (clientX - innerWidth / 2) / 50;
            const moveY = (clientY - innerHeight / 2) / 50;
            
            heroCards.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }, 50));
    },
    
    initNewsletterForm() {
        const form = document.getElementById('newsletter-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            if (!Utils.isValidEmail(email)) {
                Toast.error('Please enter a valid email address');
                return;
            }
            
            // Simulate subscription
            Toast.success('Thank you for subscribing!');
            form.reset();
        });
    }
};
/* ═══════════════════════════════════════════════════════════════════════════
   14. COURSES PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const CoursesPage = {
    init() {
        this.loadCourses();
        this.initFilters();
        this.initSort();
        this.initViewToggle();
        this.initPriceRange();
        this.initMobileFilters();
        this.initSearch();
    },
    
    async loadCourses() {
        const grid = document.getElementById('all-courses-grid');
        if (!grid) return;
        
        // Show loading
        grid.innerHTML = `
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        `;
        
        try {
            // Use demo data
            State.courses = [...DemoData.courses];
            this.applyFiltersAndRender();
        } catch (error) {
            console.error('Failed to load courses:', error);
            grid.innerHTML = '<p class="error">Failed to load courses. Please try again.</p>';
        }
    },
    
    applyFiltersAndRender() {
        let filtered = [...State.courses];
        
        // Category filter
        if (State.filters.category.length > 0) {
            filtered = filtered.filter(c => State.filters.category.includes(c.category));
        }
        
        // Level filter
        if (State.filters.level.length > 0) {
            filtered = filtered.filter(c => State.filters.level.includes(c.level));
        }
        
        // Duration filter
        if (State.filters.duration.length > 0) {
            filtered = filtered.filter(c => {
                const hours = parseInt(c.totalDuration);
                return State.filters.duration.some(d => {
                    if (d === '0-2') return hours <= 2;
                    if (d === '2-5') return hours > 2 && hours <= 5;
                    if (d === '5-10') return hours > 5 && hours <= 10;
                    if (d === '10+') return hours > 10;
                    return true;
                });
            });
        }
        
        // Price filter
        if (State.filters.priceRange < 5000) {
            filtered = filtered.filter(c => c.price <= State.filters.priceRange);
        }
        
        // Rating filter
        if (State.filters.rating) {
            filtered = filtered.filter(c => c.rating >= parseFloat(State.filters.rating));
        }
        
        // Search filter
        if (State.filters.search) {
            const query = State.filters.search.toLowerCase();
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(query) ||
                c.instructor.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query)
            );
        }
        
        // Sort
        switch (State.filters.sort) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default: // popular
                filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
        }
        
        // Update count
        const countEl = document.getElementById('courses-count');
        if (countEl) countEl.textContent = filtered.length;
        
        // Render
        this.renderCourses(filtered);
        
        // Show/hide empty state
        const emptyState = document.getElementById('courses-empty');
        const pagination = document.getElementById('courses-pagination');
        
        if (filtered.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            if (pagination) pagination.style.display = 'none';
        } else {
            if (emptyState) emptyState.style.display = 'none';
            if (pagination) pagination.style.display = 'flex';
        }
    },
    
    renderCourses(courses) {
        const grid = document.getElementById('all-courses-grid');
        if (!grid) return;
        
        if (courses.length === 0) {
            grid.innerHTML = '';
            return;
        }
        
        grid.innerHTML = courses.map(course => HomePage.createCourseCard(course)).join('');
        
        // Add event listeners (reuse from HomePage)
        grid.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.wishlist-icon') && !e.target.closest('.enroll-btn')) {
                    const courseId = card.dataset.courseId;
                    const course = DemoData.courses.find(c => c.id === courseId);
                    if (course) {
                        State.currentCourse = course;
                        Router.navigate('course-detail', { courseSlug: course.slug });
                    }
                }
            });
        });
        
        grid.querySelectorAll('.wishlist-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.closest('.course-card').dataset.courseId;
                HomePage.toggleWishlist(courseId, btn);
            });
        });
        
        grid.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.closest('.course-card').dataset.courseId;
                Cart.add(courseId);
            });
        });
    },
    
    initFilters() {
        // Category checkboxes
        document.querySelectorAll('input[name="category"]').forEach(cb => {
            cb.addEventListener('change', () => {
                State.filters.category = Array.from(
                    document.querySelectorAll('input[name="category"]:checked')
                ).map(el => el.value);
                this.applyFiltersAndRender();
            });
        });
        
        // Level checkboxes
        document.querySelectorAll('input[name="level"]').forEach(cb => {
            cb.addEventListener('change', () => {
                State.filters.level = Array.from(
                    document.querySelectorAll('input[name="level"]:checked')
                ).map(el => el.value);
                this.applyFiltersAndRender();
            });
        });
        
        // Duration checkboxes
        document.querySelectorAll('input[name="duration"]').forEach(cb => {
            cb.addEventListener('change', () => {
                State.filters.duration = Array.from(
                    document.querySelectorAll('input[name="duration"]:checked')
                ).map(el => el.value);
                this.applyFiltersAndRender();
            });
        });
        
        // Rating radio
        document.querySelectorAll('input[name="rating"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                State.filters.rating = e.target.value;
                this.applyFiltersAndRender();
            });
        });
        
        // Clear filters
        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearFilters());
        }
        
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.clearFilters());
        }
    },
    
    clearFilters() {
        State.filters = {
            category: [],
            level: [],
            duration: [],
            rating: null,
            priceRange: 5000,
            search: '',
            sort: 'popular'
        };
        
        // Reset UI
        document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('.filters-sidebar input[type="radio"]').forEach(r => r.checked = false);
        
        const priceRange = document.getElementById('price-range');
        if (priceRange) priceRange.value = 5000;
        
        const priceValue = document.getElementById('price-value');
        if (priceValue) priceValue.textContent = '₹5000';
        
        const searchInput = document.getElementById('courses-search');
        if (searchInput) searchInput.value = '';
        
        const sortSelect = document.getElementById('sort-courses');
        if (sortSelect) sortSelect.value = 'popular';
        
        this.applyFiltersAndRender();
        Toast.info('Filters cleared');
    },
    
    initSort() {
        const sortSelect = document.getElementById('sort-courses');
        if (!sortSelect) return;
        
        sortSelect.addEventListener('change', (e) => {
            State.filters.sort = e.target.value;
            this.applyFiltersAndRender();
        });
    },
    
    initViewToggle() {
        const viewBtns = document.querySelectorAll('.view-btn');
        const grid = document.getElementById('all-courses-grid');
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                if (view === 'list') {
                    grid.classList.add('list-view');
                } else {
                    grid.classList.remove('list-view');
                }
            });
        });
    },
    
    initPriceRange() {
        const slider = document.getElementById('price-range');
        const valueDisplay = document.getElementById('price-value');
        
        if (!slider || !valueDisplay) return;
        
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            valueDisplay.textContent = `₹${parseInt(value).toLocaleString()}`;
            State.filters.priceRange = parseInt(value);
        });
        
        slider.addEventListener('change', () => {
            this.applyFiltersAndRender();
        });
    },
    
    initMobileFilters() {
        const toggleBtn = document.getElementById('mobile-filter-toggle');
        const sidebar = document.getElementById('filters-sidebar');
        const applyBtn = document.getElementById('apply-filters');
        
        if (!toggleBtn || !sidebar) return;
        
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
                this.applyFiltersAndRender();
            });
        }
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    },
    
    initSearch() {
        const searchInput = document.getElementById('courses-search');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', Utils.debounce((e) => {
            State.filters.search = e.target.value.trim();
            this.applyFiltersAndRender();
        }, 300));
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   15. COURSE DETAIL PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const CourseDetailPage = {
    course: null,
    lessons: [],
    
    init() {
        this.course = State.currentCourse;
        
        if (!this.course) {
            // Try to get from URL
            const params = Utils.parseQueryString();
            if (params.course) {
                this.course = DemoData.courses.find(c => c.slug === params.course);
                State.currentCourse = this.course;
            }
        }
        
        if (!this.course) {
            Router.navigate('courses');
            return;
        }
        
        this.renderCourseDetails();
        this.loadLessons();
        this.loadReviews();
        this.initTabs();
        this.initAccordion();
        this.initActions();
    },
    
    renderCourseDetails() {
        const c = this.course;
        
        // Breadcrumb
        const breadcrumb = document.getElementById('breadcrumb-course');
        if (breadcrumb) breadcrumb.textContent = c.title;
        
        // Header
        document.getElementById('detail-category').textContent = c.category;
        document.getElementById('detail-title').textContent = c.title;
        document.getElementById('detail-subtitle').textContent = c.shortDescription;
        document.getElementById('detail-rating').textContent = c.rating;
        document.getElementById('detail-reviews').textContent = c.reviewCount.toLocaleString();
        document.getElementById('detail-students').textContent = c.enrolledCount.toLocaleString();
        document.getElementById('detail-updated').textContent = Utils.formatDate(c.updatedAt);
        document.getElementById('detail-instructor-name').textContent = c.instructor;
        document.getElementById('detail-instructor-img').src = c.instructorImage;
        
        // Thumbnail
        const thumbnailContainer = document.getElementById('detail-thumbnail');
        if (thumbnailContainer) {
            thumbnailContainer.querySelector('img').src = c.thumbnail;
        }
        
        // What you'll learn
        const learnList = document.getElementById('detail-learn-list');
        if (learnList && c.whatYouLearn) {
            learnList.innerHTML = c.whatYouLearn.map(item => `
                <li>
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ${item}
                </li>
            `).join('');
        }
        
        // Description
        const description = document.getElementById('detail-description');
        if (description) {
            description.innerHTML = c.description;
        }
        
        // Requirements
        const requirements = document.getElementById('detail-requirements');
        if (requirements && c.requirements) {
            requirements.innerHTML = c.requirements.map(item => `<li>${item}</li>`).join('');
        }
        
        // Target audience
        const target = document.getElementById('detail-target');
        if (target && c.targetAudience) {
            target.innerHTML = c.targetAudience.map(item => `<li>${item}</li>`).join('');
        }
        
        // Sidebar
        document.getElementById('sidebar-price').textContent = Utils.formatPrice(c.price);
        document.getElementById('sidebar-original-price').textContent = Utils.formatPrice(c.originalPrice);
        document.getElementById('sidebar-discount').textContent = `${c.discount}% off`;
        document.getElementById('includes-hours').textContent = c.totalDuration;
        document.getElementById('includes-validity').textContent = c.validity === 365 ? 'Lifetime' : `${c.validity} days`;
        
        // Instructor tab
        document.getElementById('instructor-photo').src = c.instructorImage;
        document.getElementById('instructor-name').textContent = c.instructor;
        document.getElementById('instructor-bio').innerHTML = `<p>${c.instructorBio}</p>`;
        
        // Reviews
        document.getElementById('review-rating').textContent = c.rating;
        
        // Curriculum stats
        document.getElementById('curriculum-lessons').textContent = c.totalLessons;
        document.getElementById('curriculum-duration').textContent = c.totalDuration;
    },
    
    async loadLessons() {
        try {
            const result = await API.getLessons(this.course.id);
            if (result.success) {
                this.lessons = result.lessons || DemoData.lessons[this.course.id] || [];
                this.renderCurriculum();
            }
        } catch (error) {
            console.error('Failed to load lessons:', error);
            // Use demo data as fallback
            this.lessons = DemoData.lessons[this.course.id] || [];
            this.renderCurriculum();
        }
    },
    
    renderCurriculum() {
        const container = document.getElementById('curriculum-list');
        if (!container || !this.lessons.length) return;
        
        const isEnrolled = Auth.isEnrolled(this.course.id);
        
        container.innerHTML = this.lessons.map((section, sIndex) => `
            <div class="curriculum-section ${sIndex === 0 ? 'active' : ''}">
                <button class="section-header">
                    <div class="section-info">
                        <svg class="icon chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9l6 6 6-6"></path>
                        </svg>
                        <span class="section-title">${section.sectionTitle}</span>
                    </div>
                    <span class="section-meta">${section.lessons.length} lessons</span>
                </button>
                <div class="section-content" ${sIndex === 0 ? '' : 'style="display: none;"'}>
                    ${section.lessons.map(lesson => `
                        <div class="lesson-item ${!isEnrolled && !lesson.isFree ? 'locked' : ''}" 
                             data-lesson-id="${lesson.id}"
                             data-is-free="${lesson.isFree}">
                            <div class="lesson-info">
                                ${!isEnrolled && !lesson.isFree ? `
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                ` : `
                                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                `}
                                <span class="lesson-title">${lesson.title}</span>
                                ${lesson.isFree ? '<span class="lesson-badge free">Preview</span>' : ''}
                            </div>
                            <span class="lesson-duration">${lesson.duration}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        // Update section count
        document.getElementById('curriculum-sections').textContent = this.lessons.length;
        
        // Re-init accordion
        this.initAccordion();
        
        // Add click handlers for lessons
        container.querySelectorAll('.lesson-item').forEach(item => {
            item.addEventListener('click', () => {
                const lessonId = item.dataset.lessonId;
                const isFree = item.dataset.isFree === 'true';
                const isEnrolled = Auth.isEnrolled(this.course.id);
                
                if (isEnrolled || isFree) {
                    this.playLesson(lessonId);
                } else {
                    Toast.warning('Please enroll to access this lesson');
                }
            });
        });
    },
    
    async loadReviews() {
        try {
            const result = await API.getReviews(this.course.id);
            if (result.success) {
                this.renderReviews(result.reviews || DemoData.reviews);
            }
        } catch (error) {
            console.error('Failed to load reviews:', error);
            this.renderReviews(DemoData.reviews.filter(r => r.courseId === this.course.id));
        }
    },
    
    renderReviews(reviews) {
        const container = document.getElementById('reviews-list');
        if (!container) return;
        
        container.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <img src="${review.userImage}" alt="${review.userName}" class="reviewer-avatar">
                    <div class="reviewer-info">
                        <h4 class="reviewer-name">${review.userName}</h4>
                        <div class="review-meta">
                            <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
                            <span class="review-date">${Utils.formatRelativeTime(review.createdAt)}</span>
                        </div>
                    </div>
                </div>
                <p class="review-text">${review.reviewText}</p>
                <div class="review-actions">
                    <button class="helpful-btn">
                        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                        </svg>
                        Helpful (${review.helpful})
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    initTabs() {
        const tabBtns = document.querySelectorAll('.course-tabs .tab-btn');
        const tabContents = document.querySelectorAll('.course-tabs .tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(`tab-${tab}`)?.classList.add('active');
            });
        });
    },
    
    initAccordion() {
        document.querySelectorAll('.curriculum-section .section-header').forEach(header => {
            header.addEventListener('click', () => {
                const section = header.parentElement;
                const content = section.querySelector('.section-content');
                const isActive = section.classList.contains('active');
                
                // Toggle
                section.classList.toggle('active');
                content.style.display = isActive ? 'none' : 'block';
            });
        });
        
        // Expand all button
        const expandAllBtn = document.getElementById('expand-all');
        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                const sections = document.querySelectorAll('.curriculum-section');
                const allExpanded = Array.from(sections).every(s => s.classList.contains('active'));
                
                sections.forEach(section => {
                    const content = section.querySelector('.section-content');
                    if (allExpanded) {
                        section.classList.remove('active');
                        content.style.display = 'none';
                    } else {
                        section.classList.add('active');
                        content.style.display = 'block';
                    }
                });
                
                expandAllBtn.textContent = allExpanded ? 'Expand All' : 'Collapse All';
            });
        }
    },
    
    initActions() {
        // Add to cart
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                Cart.add(this.course.id);
            });
        }
        
        // Buy now
        const buyNowBtn = document.getElementById('buy-now-btn');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                Cart.add(this.course.id);
                Router.navigate('checkout');
            });
        }
        
        // Wishlist
        const wishlistBtn = document.getElementById('wishlist-course');
        if (wishlistBtn) {
            const isWishlisted = State.wishlist.includes(this.course.id);
            if (isWishlisted) {
                wishlistBtn.classList.add('active');
            }
            
            wishlistBtn.addEventListener('click', () => {
                HomePage.toggleWishlist(this.course.id, wishlistBtn);
            });
        }
        
        // Share
        const shareBtn = document.getElementById('share-course');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                Modal.open('share-modal');
            });
        }
        
        // Preview video
        const previewBtn = document.getElementById('preview-play-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                // Find first free lesson
                let freeLesson = null;
                for (const section of this.lessons) {
                    freeLesson = section.lessons.find(l => l.isFree);
                    if (freeLesson) break;
                }
                
                if (freeLesson) {
                    this.openVideoPreview(freeLesson.youtubeId);
                } else {
                    Toast.info('No preview available');
                }
            });
        }
        
        // Coupon
        const applyCouponBtn = document.getElementById('apply-coupon');
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', async () => {
                const input = document.getElementById('coupon-input');
                const code = input.value.trim();
                
                if (!code) {
                    Toast.warning('Please enter a coupon code');
                    return;
                }
                
                try {
                    const result = await API.applyCoupon(code, this.course.id);
                    if (result.success) {
                        Toast.success(`Coupon applied! You saved ${Utils.formatPrice(result.discount)}`);
                    }
                } catch (error) {
                    Toast.error('Invalid or expired coupon code');
                }
            });
        }
        
        // Share modal handlers
        this.initShareModal();
    },
    
    openVideoPreview(youtubeId) {
        const modal = document.getElementById('video-modal');
        const iframe = document.getElementById('modal-video');
        
        if (modal && iframe) {
            iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
            Modal.open('video-modal');
        }
    },
    
    playLesson(lessonId) {
        State.currentLesson = lessonId;
        Router.navigate('player');
    },
    
    initShareModal() {
        document.querySelectorAll('.share-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.share;
                const url = window.location.href;
                const title = this.course?.title || 'Check out this course!';
                
                let shareUrl = '';
                
                switch (platform) {
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
                        break;
                    case 'copy':
                        Utils.copyToClipboard(url);
                        Toast.success('Link copied to clipboard!');
                        Modal.close('share-modal');
                        return;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    Modal.close('share-modal');
                }
            });
        });
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   16. VIDEO PLAYER PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const PlayerPage = {
    course: null,
    lessons: [],
    currentLessonIndex: 0,
    currentSectionIndex: 0,
    player: null,
    watermarkInterval: null,
    devToolsOpen: false,
    
    init() {
        this.course = State.currentCourse;
        
        if (!this.course) {
            Router.navigate('courses');
            return;
        }
        
        // Check enrollment
        if (!Auth.isEnrolled(this.course.id) && !CONFIG.DEMO_MODE) {
            Toast.warning('Please enroll to access this course');
            Router.navigate('course-detail', { courseSlug: this.course.slug });
            return;
        }
        
        this.lessons = DemoData.lessons[this.course.id] || [];
        
        this.renderHeader();
        this.renderLessonsSidebar();
        this.loadCurrentLesson();
        this.initControls();
        this.initSecurity();
        this.initWatermark();
    },
    
    renderHeader() {
        document.getElementById('player-course-title').textContent = this.course.title;
        
        // Update progress
        const progress = this.calculateProgress();
        document.getElementById('course-progress-fill').style.width = `${progress}%`;
        document.getElementById('course-progress-text').textContent = `${progress}% complete`;
    },
    
    calculateProgress() {
        // In real app, calculate from completed lessons
        return 25; // Demo value
    },
    
    renderLessonsSidebar() {
        const container = document.getElementById('lessons-sidebar');
        if (!container) return;
        
        container.innerHTML = this.lessons.map((section, sIndex) => `
            <div class="sidebar-section ${sIndex === this.currentSectionIndex ? 'active' : ''}">
                <div class="sidebar-section-header">
                    <span class="sidebar-section-title">${section.sectionTitle}</span>
                    <span class="sidebar-section-meta">${section.lessons.length} lessons</span>
                </div>
                <div class="sidebar-lessons">
                    ${section.lessons.map((lesson, lIndex) => `
                        <div class="sidebar-lesson ${this.isCurrentLesson(sIndex, lIndex) ? 'active' : ''}"
                             data-section="${sIndex}" data-lesson="${lIndex}">
                            <div class="lesson-status">
                                ${this.isLessonCompleted(lesson.id) ? '✓' : '○'}
                            </div>
                            <div class="lesson-info">
                                <span class="lesson-title">${lesson.title}</span>
                                <span class="lesson-duration">${lesson.duration}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        container.querySelectorAll('.sidebar-section-header').forEach(header => {
            header.addEventListener('click', () => {
                header.parentElement.classList.toggle('active');
            });
        });
        
        container.querySelectorAll('.sidebar-lesson').forEach(item => {
            item.addEventListener('click', () => {
                const sectionIndex = parseInt(item.dataset.section);
                const lessonIndex = parseInt(item.dataset.lesson);
                this.goToLesson(sectionIndex, lessonIndex);
            });
        });
    },
    
    isCurrentLesson(sectionIndex, lessonIndex) {
        return sectionIndex === this.currentSectionIndex && lessonIndex === this.currentLessonIndex;
    },
    
    isLessonCompleted(lessonId) {
        // In real app, check from State.enrollments
        return false;
    },
    
    async loadCurrentLesson() {
        const section = this.lessons[this.currentSectionIndex];
        if (!section) return;
        
        const lesson = section.lessons[this.currentLessonIndex];
        if (!lesson) return;
        
        // Update UI
        document.getElementById('current-lesson-title').textContent = lesson.title;
        document.getElementById('lesson-title').textContent = lesson.title;
        document.getElementById('lesson-description').textContent = `Part of ${section.sectionTitle}`;
        
        // Show loading
        document.getElementById('video-loading').style.display = 'flex';
        
        try {
            // Get video token
            const result = await API.getVideoToken(lesson.id, this.course.id);
            
            if (result.success) {
                this.loadVideo(result.youtubeId || lesson.youtubeId);
            }
        } catch (error) {
            console.error('Failed to load video:', error);
            // Use demo video
            this.loadVideo(lesson.youtubeId);
        }
        
        // Update sidebar
        this.updateSidebarActive();
    },
    
    loadVideo(youtubeId) {
        const iframe = document.getElementById('youtube-player');
        const loading = document.getElementById('video-loading');
        
        // Construct YouTube URL with parameters to limit functionality
        const params = new URLSearchParams({
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            controls: 1,
            disablekb: 0,
            fs: 1,
            iv_load_policy: 3,
            playsinline: 1
        });
        
        iframe.src = `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
        
        iframe.onload = () => {
            loading.style.display = 'none';
        };
    },
    
    updateSidebarActive() {
        document.querySelectorAll('.sidebar-lesson').forEach(item => {
            const sectionIndex = parseInt(item.dataset.section);
            const lessonIndex = parseInt(item.dataset.lesson);
            
            item.classList.toggle('active', this.isCurrentLesson(sectionIndex, lessonIndex));
        });
    },
    
    goToLesson(sectionIndex, lessonIndex) {
        this.currentSectionIndex = sectionIndex;
        this.currentLessonIndex = lessonIndex;
        this.loadCurrentLesson();
    },
    
    nextLesson() {
        const section = this.lessons[this.currentSectionIndex];
        
        if (this.currentLessonIndex < section.lessons.length - 1) {
            this.currentLessonIndex++;
        } else if (this.currentSectionIndex < this.lessons.length - 1) {
            this.currentSectionIndex++;
            this.currentLessonIndex = 0;
        } else {
            Toast.success('Congratulations! You completed the course!');
            return;
        }
        
        this.loadCurrentLesson();
    },
    
    prevLesson() {
        if (this.currentLessonIndex > 0) {
            this.currentLessonIndex--;
        } else if (this.currentSectionIndex > 0) {
            this.currentSectionIndex--;
            const section = this.lessons[this.currentSectionIndex];
            this.currentLessonIndex = section.lessons.length - 1;
        } else {
            Toast.info('This is the first lesson');
            return;
        }
        
        this.loadCurrentLesson();
    },
    
    initControls() {
        // Back button
        const backBtn = document.getElementById('player-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                Router.navigate('course-detail', { courseSlug: this.course.slug });
            });
        }
        
        // Previous/Next buttons
        const prevBtn = document.getElementById('prev-lesson-btn');
        const nextBtn = document.getElementById('next-lesson-btn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevLesson());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextLesson());
        
        // Speed control
        const speedBtn = document.getElementById('speed-btn');
        const speedMenu = document.getElementById('speed-menu');
        
        if (speedMenu) {
            speedMenu.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const speed = btn.dataset.speed;
                    speedBtn.textContent = `${speed}x`;
                    
                    speedMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Note: Can't change YouTube iframe speed directly
                    // Would need YouTube IFrame API for this
                });
            });
        }
        
        // Mark complete
        const markCompleteBtn = document.getElementById('mark-complete-btn');
        if (markCompleteBtn) {
            markCompleteBtn.addEventListener('click', async () => {
                const section = this.lessons[this.currentSectionIndex];
                const lesson = section?.lessons[this.currentLessonIndex];
                
                if (lesson) {
                    try {
                        await API.markLessonComplete(lesson.id, this.course.id);
                        markCompleteBtn.classList.add('completed');
                        markCompleteBtn.innerHTML = `
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Completed
                        `;
                        Toast.success('Lesson marked as complete');
                        
                        // Auto go to next lesson after 2 seconds
                        setTimeout(() => this.nextLesson(), 2000);
                    } catch (error) {
                        Toast.error('Failed to mark as complete');
                    }
                }
            });
        }
        
        // Notes
        const saveNotesBtn = document.getElementById('save-notes-btn');
        if (saveNotesBtn) {
            saveNotesBtn.addEventListener('click', () => {
                const notes = document.getElementById('lesson-notes').value;
                // Save notes to localStorage or server
                const key = `notes_${this.course.id}_${this.currentSectionIndex}_${this.currentLessonIndex}`;
                localStorage.setItem(key, notes);
                Toast.success('Notes saved');
            });
        }
        
        // Video tabs
        document.querySelectorAll('.video-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                document.querySelectorAll('.video-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.video-tab-content').forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(`${tab}-tab`)?.classList.add('active');
            });
        });
        
        // Mobile sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const playerSidebar = document.getElementById('player-sidebar');
        
        if (sidebarToggle && playerSidebar) {
            sidebarToggle.addEventListener('click', () => {
                playerSidebar.classList.remove('active');
            });
        }
    },
    
    initSecurity() {
        // Disable right-click
        document.addEventListener('contextmenu', (e) => {
            if (State.currentPage === 'player') {
                e.preventDefault();
                Toast.warning('Right-click is disabled for security');
            }
        });
        
        // Detect DevTools
        const detectDevTools = () => {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                if (!this.devToolsOpen) {
                    this.devToolsOpen = true;
                    this.showSecurityOverlay();
                }
            } else {
                if (this.devToolsOpen) {
                    this.devToolsOpen = false;
                    this.hideSecurityOverlay();
                }
            }
        };
        
        // Check periodically
        setInterval(detectDevTools, 1000);
        
        // Disable keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (State.currentPage !== 'player') return;
            
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'u')) {
                e.preventDefault();
                Toast.warning('This action is disabled for security');
            }
        });
    },
    
    showSecurityOverlay() {
        const overlay = document.getElementById('security-overlay');
        if (overlay) overlay.style.display = 'flex';
        
        // Pause video by removing iframe src
        const iframe = document.getElementById('youtube-player');
        if (iframe) {
            this.pausedVideoSrc = iframe.src;
            iframe.src = '';
        }
    },
    
    hideSecurityOverlay() {
        const overlay = document.getElementById('security-overlay');
        if (overlay) overlay.style.display = 'none';
        
        // Resume video
        const iframe = document.getElementById('youtube-player');
        if (iframe && this.pausedVideoSrc) {
            iframe.src = this.pausedVideoSrc;
        }
    },
    
    initWatermark() {
        const watermark = document.getElementById('video-watermark');
        if (!watermark || !State.user) return;
        
        watermark.querySelector('span').textContent = State.user.email;
        
        // Move watermark periodically
        const moveWatermark = () => {
            const positions = [
                { top: '10%', left: '10%' },
                { top: '10%', left: '70%' },
                { top: '80%', left: '70%' },
                { top: '80%', left: '10%' },
                { top: '50%', left: '40%' }
            ];
            
            const pos = positions[Math.floor(Math.random() * positions.length)];
            watermark.style.top = pos.top;
            watermark.style.left = pos.left;
        };
        
        this.watermarkInterval = setInterval(moveWatermark, CONFIG.WATERMARK_INTERVAL);
    },
    
    cleanup() {
        if (this.watermarkInterval) {
            clearInterval(this.watermarkInterval);
        }
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   17. DASHBOARD PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const DashboardPage = {
    init() {
        if (!State.isAuthenticated) {
            Router.navigate('login');
            return;
        }
        
        this.renderWelcome();
        this.renderStats();
        this.initSidebar();
        this.initSections();
        this.loadEnrolledCourses();
        this.loadRecommended();
    },
    
    renderWelcome() {
        const welcomeName = document.getElementById('welcome-name');
        if (welcomeName && State.user) {
            welcomeName.textContent = State.user.name.split(' ')[0];
        }
        
        // Update avatar
        const avatar = document.getElementById('dashboard-avatar');
        if (avatar && State.user) {
            avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(State.user.name)}&background=6366f1&color=fff`;
        }
    },
    
    renderStats() {
        // In real app, fetch from API
        document.getElementById('enrolled-count').textContent = State.enrollments.length || 3;
        document.getElementById('completed-count').textContent = 1;
        document.getElementById('certificate-count').textContent = 1;
        document.getElementById('hours-watched').textContent = 24;
    },
    
    initSidebar() {
        // Mobile sidebar toggle
        const mobileToggle = document.getElementById('mobile-sidebar-toggle');
        const sidebar = document.getElementById('dashboard-sidebar');
        
        if (mobileToggle && sidebar) {
            mobileToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
        
        // Sidebar links
        document.querySelectorAll('.dashboard-sidebar .sidebar-link[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                
                // Update active link
                document.querySelectorAll('.dashboard-sidebar .sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile sidebar
                if (sidebar) sidebar.classList.remove('active');
            });
        });
        
        // Logout
        const logoutBtn = document.getElementById('dashboard-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => Auth.logout());
        }
    },
    
    showSection(sectionId) {
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const section = document.getElementById(`section-${sectionId}`);
        if (section) {
            section.classList.add('active');
            
            // Load section content
            switch (sectionId) {
                case 'my-courses':
                    this.loadMyCourses();
                    break;
                case 'wishlist':
                    this.loadWishlist();
                    break;
                case 'certificates':
                    this.loadCertificates();
                    break;
                case 'settings':
                    this.loadSettings();
                    break;
            }
        }
    },
    
    initSections() {
        // Continue learning section navigation
        document.querySelectorAll('[data-section]').forEach(el => {
            el.addEventListener('click', (e) => {
                if (el.classList.contains('view-all')) {
                    e.preventDefault();
                    const section = el.dataset.section;
                    this.showSection(section);
                    
                    // Update sidebar
                    document.querySelectorAll('.dashboard-sidebar .sidebar-link').forEach(l => {
                        l.classList.toggle('active', l.dataset.section === section);
                    });
                }
            });
        });
        
        // Course filter buttons
        document.querySelectorAll('.courses-filter .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.courses-filter .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                this.filterMyCourses(filter);
            });
        });
    },
    
    loadEnrolledCourses() {
        const grid = document.getElementById('continue-learning-grid');
        const emptyState = document.getElementById('no-courses-enrolled');
        
        if (!grid) return;
        
        // Demo: Show some courses as enrolled
        const enrolledCourses = DemoData.courses.slice(0, 3);
        
        if (enrolledCourses.length === 0) {
            grid.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }
        
        if (emptyState) emptyState.style.display = 'none';
        
        grid.innerHTML = enrolledCourses.map((course, index) => {
            const progress = [25, 60, 100][index] || 0;
            
            return `
                <div class="continue-card" data-course-id="${course.id}">
                    <img src="${course.thumbnail}" alt="${course.title}" class="card-thumb">
                    <div class="card-content">
                        <h4 class="card-title">${course.title}</h4>
                        <div class="progress-info">
                            <span>${progress}% complete</span>
                            <span>${course.totalLessons} lessons</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <button class="btn btn-primary btn-sm">${progress === 100 ? 'Review' : 'Continue'}</button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click handlers
        grid.querySelectorAll('.continue-card').forEach(card => {
            card.addEventListener('click', () => {
                const courseId = card.dataset.courseId;
                const course = DemoData.courses.find(c => c.id === courseId);
                if (course) {
                    State.currentCourse = course;
                    Router.navigate('player');
                }
            });
        });
    },
    
    loadRecommended() {
        const grid = document.getElementById('recommended-grid');
        if (!grid) return;
        
        // Show courses user hasn't enrolled in
        const recommended = DemoData.courses.slice(3, 6);
        
        grid.innerHTML = recommended.map(course => HomePage.createCourseCard(course)).join('');
        
        // Add event listeners
        grid.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.wishlist-icon') && !e.target.closest('.enroll-btn')) {
                    const courseId = card.dataset.courseId;
                    const course = DemoData.courses.find(c => c.id === courseId);
                    if (course) {
                        State.currentCourse = course;
                        Router.navigate('course-detail', { courseSlug: course.slug });
                    }
                }
            });
        });
    },
    
    loadMyCourses() {
        const grid = document.getElementById('my-courses-grid');
        if (!grid) return;
        
        // Demo enrolled courses
        const enrolledCourses = DemoData.courses.slice(0, 4);
        
        grid.innerHTML = enrolledCourses.map((course, index) => {
            const progress = [25, 60, 100, 45][index] || 0;
            
            return `
                <div class="course-card enrolled" data-course-id="${course.id}" data-progress="${progress}">
                    <div class="card-image">
                        <img src="${course.thumbnail}" alt="${course.title}">
                        <div class="card-overlay">
                            <span class="play-icon">▶</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${course.title}</h3>
                        <div class="progress-info" style="display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                            <span>${progress}% complete</span>
                        </div>
                        <div class="progress-bar" style="height: 6px; background: var(--gray-200); border-radius: 999px; overflow: hidden; margin-bottom: 1rem;">
                            <div class="progress-fill" style="width: ${progress}%; height: 100%; background: var(--primary-600); border-radius: 999px;"></div>
                        </div>
                        <button class="btn btn-primary btn-block btn-sm">${progress === 100 ? 'View Certificate' : 'Continue Learning'}</button>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add click handlers
        grid.querySelectorAll('.course-card').forEach(card => {
            card.querySelector('.btn').addEventListener('click', () => {
                const courseId = card.dataset.courseId;
                const progress = parseInt(card.dataset.progress);
                const course = DemoData.courses.find(c => c.id === courseId);
                
                if (course) {
                    State.currentCourse = course;
                    if (progress === 100) {
                        this.showSection('certificates');
                    } else {
                        Router.navigate('player');
                    }
                }
            });
        });
    },
    
    filterMyCourses(filter) {
        const cards = document.querySelectorAll('#my-courses-grid .course-card');
        
        cards.forEach(card => {
            const progress = parseInt(card.dataset.progress);
            let show = true;
            
            if (filter === 'in-progress') {
                show = progress > 0 && progress < 100;
            } else if (filter === 'completed') {
                show = progress === 100;
            }
            
            card.style.display = show ? '' : 'none';
        });
    },
    
    loadWishlist() {
        const grid = document.getElementById('wishlist-grid');
        if (!grid) return;
        
        const wishlistCourses = DemoData.courses.filter(c => State.wishlist.includes(c.id));
        
        if (wishlistCourses.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-icon">❤️</div>
                    <h3>Your wishlist is empty</h3>
                    <p>Save courses you're interested in for later</p>
                    <button class="btn btn-primary" data-page="courses">Browse Courses</button>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = wishlistCourses.map(course => HomePage.createCourseCard(course)).join('');
    },
    
    loadCertificates() {
        const grid = document.getElementById('certificates-grid');
        if (!grid) return;
        
        // Demo certificate
        const completedCourses = [DemoData.courses[0]];
        
        if (completedCourses.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-icon">🎓</div>
                    <h3>No certificates yet</h3>
                    <p>Complete a course to earn your first certificate</p>
                    <button class="btn btn-primary" data-page="courses">Browse Courses</button>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = completedCourses.map(course => `
            <div class="certificate-card">
                <div class="certificate-preview">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                </div>
                <h4>${course.title}</h4>
                <p>Completed on ${Utils.formatDate(new Date().toISOString())}</p>
                <button class="btn btn-primary btn-block">Download Certificate</button>
            </div>
        `).join('');
    },
    
    loadSettings() {
        if (!State.user) return;
        
        // Populate form fields
        document.getElementById('settings-name').value = State.user.name || '';
        document.getElementById('settings-email').value = State.user.email || '';
        document.getElementById('settings-phone').value = State.user.phone || '';
        
        // Profile form
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                State.user.name = document.getElementById('settings-name').value;
                State.user.phone = document.getElementById('settings-phone').value;
                State.saveUser();
                
                Toast.success('Profile updated successfully');
                UI.updateAuthUI();
            });
        }
        
        // Password form
        const passwordForm = document.getElementById('password-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const current = document.getElementById('current-password').value;
                const newPass = document.getElementById('new-password').value;
                const confirm = document.getElementById('confirm-password').value;
                
                if (newPass !== confirm) {
                    Toast.error('New passwords do not match');
                    return;
                }
                
                if (newPass.length < 8) {
                    Toast.error('Password must be at least 8 characters');
                    return;
                }
                
                // In real app, call API
                Toast.success('Password updated successfully');
                passwordForm.reset();
            });
        }
        
        // Delete account
        const deleteBtn = document.getElementById('delete-account-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                Modal.confirm(
                    'Delete Account',
                    'Are you sure you want to delete your account? This action cannot be undone.',
                    () => {
                        // In real app, call API
                        Auth.logout();
                        Toast.info('Account deleted');
                    }
                );
            });
        }
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   18. CART & CHECKOUT
   ═══════════════════════════════════════════════════════════════════════════ */

const Cart = {
    add(courseId) {
        if (!State.isAuthenticated) {
            Toast.warning('Please login to add courses to cart');
            Router.navigate('login');
            return;
        }
        
        // Check if already enrolled
        if (Auth.isEnrolled(courseId)) {
            Toast.info('You are already enrolled in this course');
            return;
        }
        
        // Check if already in cart
        if (State.cart.includes(courseId)) {
            Toast.info('Course already in cart');
            return;
        }
        
        State.cart.push(courseId);
        State.saveCart();
        UI.updateCartCount();
        
        Toast.success('Course added to cart');
    },
    
    remove(courseId) {
        const index = State.cart.indexOf(courseId);
        if (index > -1) {
            State.cart.splice(index, 1);
            State.saveCart();
            UI.updateCartCount();
        }
    },
    
    clear() {
        State.cart = [];
        State.saveCart();
        UI.updateCartCount();
    },
    
    getTotal() {
        return State.cart.reduce((total, courseId) => {
            const course = DemoData.courses.find(c => c.id === courseId);
            return total + (course ? course.price : 0);
        }, 0);
    },
    
    getItems() {
        return State.cart.map(courseId => DemoData.courses.find(c => c.id === courseId)).filter(Boolean);
    }
};

const CheckoutPage = {
    couponDiscount: 0,
    
    init() {
        if (!State.isAuthenticated) {
            Router.navigate('login');
            return;
        }
        
        if (State.cart.length === 0) {
            Toast.warning('Your cart is empty');
            Router.navigate('courses');
            return;
        }
        
        this.renderCartItems();
        this.updateTotals();
        this.initCoupon();
        this.initPayment();
    },
    
    renderCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;
        
        const items = Cart.getItems();
        
        container.innerHTML = items.map(course => `
            <div class="cart-item" data-course-id="${course.id}">
                <img src="${course.thumbnail}" alt="${course.title}" class="item-image">
                <div class="item-info">
                    <h4 class="item-title">${course.title}</h4>
                    <p class="item-instructor">by ${course.instructor}</p>
                    <div>
                        <span class="item-price">${Utils.formatPrice(course.price)}</span>
                        <span style="text-decoration: line-through; color: var(--text-tertiary); margin-left: 0.5rem; font-size: 0.875rem;">
                            ${Utils.formatPrice(course.originalPrice)}
                        </span>
                    </div>
                </div>
                <button class="item-remove" aria-label="Remove">
                    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `).join('');
        
        // Remove handlers
        container.querySelectorAll('.item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = btn.closest('.cart-item').dataset.courseId;
                Cart.remove(courseId);
                this.renderCartItems();
                this.updateTotals();
                
                if (State.cart.length === 0) {
                    Router.navigate('courses');
                }
            });
        });
    },
    
    updateTotals() {
        const subtotal = Cart.getTotal();
        const discount = this.couponDiscount;
        const total = subtotal - discount;
        
        document.getElementById('checkout-subtotal').textContent = Utils.formatPrice(subtotal);
        document.getElementById('checkout-total').textContent = Utils.formatPrice(total);
        
        const discountRow = document.getElementById('discount-row');
        if (discount > 0 && discountRow) {
            discountRow.style.display = 'flex';
            document.getElementById('checkout-discount').textContent = `-${Utils.formatPrice(discount)}`;
        } else if (discountRow) {
            discountRow.style.display = 'none';
        }
    },
    
    initCoupon() {
        const applyBtn = document.getElementById('apply-checkout-coupon');
        const input = document.getElementById('checkout-coupon');
        const message = document.getElementById('coupon-message');
        
        if (!applyBtn || !input) return;
        
        applyBtn.addEventListener('click', async () => {
            const code = input.value.trim().toUpperCase();
            
            if (!code) {
                Toast.warning('Please enter a coupon code');
                return;
            }
            
            // Demo coupons
            const coupons = {
                'LEARN20': 20,
                'SAVE50': 50,
                'NEWUSER': 30
            };
            
            if (coupons[code]) {
                const subtotal = Cart.getTotal();
                this.couponDiscount = Math.round(subtotal * (coupons[code] / 100));
                
                message.textContent = `Coupon applied! ${coupons[code]}% off`;
                message.className = 'coupon-message success';
                
                this.updateTotals();
                Toast.success(`Coupon applied! You saved ${Utils.formatPrice(this.couponDiscount)}`);
            } else {
                message.textContent = 'Invalid or expired coupon code';
                message.className = 'coupon-message error';
                Toast.error('Invalid coupon code');
            }
        });
    },
    
    initPayment() {
        const payBtn = document.getElementById('pay-now-btn');
        if (!payBtn) return;
        
        payBtn.addEventListener('click', async () => {
            Loading.buttonStart(payBtn);
            
            try {
                const total = Cart.getTotal() - this.couponDiscount;
                
                if (CONFIG.DEMO_MODE) {
                    // Simulate payment in demo mode
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    this.onPaymentSuccess({
                        orderId: Utils.generateId('order'),
                        amount: total
                    });
                    return;
                }
                
                // Create order
                const orderResult = await API.createOrder(State.cart[0], null);
                
                if (!orderResult.success) {
                    throw new Error('Failed to create order');
                }
                
                // Open Razorpay
                const options = {
                    key: CONFIG.RAZORPAY_KEY,
                    amount: total * 100, // in paise
                    currency: CONFIG.CURRENCY,
                    name: CONFIG.APP_NAME,
                    description: `Purchase of ${State.cart.length} course(s)`,
                    order_id: orderResult.razorpayOrderId,
                    handler: async (response) => {
                        await this.verifyPayment(response, orderResult.orderId);
                    },
                    prefill: {
                        name: State.user.name,
                        email: State.user.email,
                        contact: State.user.phone
                    },
                    theme: {
                        color: '#6366f1'
                    },
                    modal: {
                        ondismiss: () => {
                            Loading.buttonStop(payBtn);
                            Toast.info('Payment cancelled');
                        }
                    }
                };
                
                const razorpay = new Razorpay(options);
                razorpay.open();
                
            } catch (error) {
                console.error('Payment error:', error);
                Toast.error('Payment failed. Please try again.');
                Loading.buttonStop(payBtn);
            }
        });
    },
    
    async verifyPayment(response, orderId) {
        try {
            const result = await API.verifyPayment(
                orderId,
                response.razorpay_payment_id,
                response.razorpay_signature
            );
            
            if (result.success) {
                this.onPaymentSuccess({
                    orderId: orderId,
                    paymentId: response.razorpay_payment_id,
                    amount: Cart.getTotal() - this.couponDiscount
                });
            } else {
                throw new Error('Payment verification failed');
            }
        } catch (error) {
            Toast.error('Payment verification failed. Please contact support.');
        }
    },
    
    onPaymentSuccess(data) {
        // Update state
        const purchasedCourse = DemoData.courses.find(c => c.id === State.cart[0]);
        
        // Show success page
        document.getElementById('success-order-id').textContent = data.orderId;
        document.getElementById('success-course-name').textContent = purchasedCourse?.title || 'Course';
        document.getElementById('success-amount').textContent = Utils.formatPrice(data.amount);
        document.getElementById('success-validity').textContent = purchasedCourse?.validity === 365 ? 'Lifetime' : `${purchasedCourse?.validity} days`;
        
        // Clear cart
        Cart.clear();
        
        // Navigate to success page
        Router.navigate('success');
        
        // Show confetti
        this.showConfetti();
        
        // Start learning button
        const startBtn = document.getElementById('start-learning-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                State.currentCourse = purchasedCourse;
                Router.navigate('player');
            });
        }
    },
    
    showConfetti() {
        const container = document.getElementById('confetti');
        if (!container) return;
        
        const colors = ['#6366f1', '#22d3ee', '#a855f7', '#ec4899', '#f97316'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                opacity: ${Math.random()};
                transform: rotate(${Math.random() * 360}deg);
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            container.appendChild(confetti);
        }
        
        // Add animation keyframes
        if (!document.getElementById('confetti-styles')) {
            const style = document.createElement('style');
            style.id = 'confetti-styles';
            style.textContent = `
                @keyframes confetti-fall {
                    to {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Clean up after animation
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }
};

/* ═══════════════════════════════════════════════════════════════════════════
   19. APP INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */

const App = {
    async init() {
        console.log('🎓 LearnVerse Academy - Initializing...');
        
        // Initialize state from localStorage
        State.init();
        
        // Initialize components
        Loading.init();
        Toast.init();
        Modal.init();
        UI.init();
        Router.init();
        
        // Load initial data
        await this.loadInitialData();
        
        // Hide loading screen
        setTimeout(() => {
            Loading.hide();
        }, 1000);
        
        // Log logout handlers
        document.getElementById('logout-btn')?.addEventListener('click', () => Auth.logout());
        
        // Cart button
        document.getElementById('cart-btn')?.addEventListener('click', () => {
            if (State.cart.length > 0) {
                Router.navigate('checkout');
            } else {
                Toast.info('Your cart is empty');
            }
        });
        
        // Update copyright year
        const yearEl = document.getElementById('current-year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
        
        console.log('✅ LearnVerse Academy - Ready!');
    },
    
    async loadInitialData() {
        try {
            // Load courses
            const result = await API.getCourses();
            if (result.success) {
                State.courses = result.courses;
            }
            
            // Load enrollments if logged in
            if (State.isAuthenticated) {
                await Auth.loadEnrollments();
            }
        } catch (error) {
            console.error('Failed to load initial data:', error);
        }
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Handle page visibility changes (pause video when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && State.currentPage === 'player') {
        // Could pause video here if using YouTube API
    }
});

// Handle before unload (warn if there's unsaved data)
window.addEventListener('beforeunload', (e) => {
    if (State.currentPage === 'checkout' && State.cart.length > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Export for debugging
window.LearnVerse = {
    State,
    Config: CONFIG,
    API,
    Auth,
    Cart,
    Router,
    Utils,
    DemoData

};





