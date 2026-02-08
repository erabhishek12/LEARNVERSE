/* ═══════════════════════════════════════════════════════════════════════════════
   FILE: script.js
   LearnVerse Academy - Complete JavaScript Application
   SPA Router, API Integration, Authentication, Video Player, Payments
═══════════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
    // Google Apps Script Web App URL (Replace with your deployed URL)
    API_URL: 'https://script.google.com/macros/s/AKfycbz0d3HVb6s2fsXKtgEqbzfNwcVSP35XOwlPbGwACtZIf95k2c14pSMPCXhzK7PRmbhL/exec',
    
    // Razorpay Key ID (Replace with your key - use test key for testing)
    RAZORPAY_KEY_ID: 'rzp_test_SDJVf0FkMO5XxH',
    
    // Site Settings
    SITE_NAME: 'LearnVerse Academy',
    SITE_URL: 'https://learnverse.academy',
    CURRENCY: 'INR',
    CURRENCY_SYMBOL: '₹',
    
    // Video Token Expiry (in minutes)
    VIDEO_TOKEN_EXPIRY: 5,
    
    // Max Devices per User
    MAX_DEVICES: 2,
    
    // Demo Mode (uses local data instead of API)
    DEMO_MODE: false,
    
    // Local Storage Keys
    STORAGE_KEYS: {
        TOKEN: 'lv_auth_token',
        USER: 'lv_user',
        THEME: 'lv_theme',
        DEVICE_ID: 'lv_device_id',
        WISHLIST: 'lv_wishlist',
        CART: 'lv_cart'
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO DATA (Used when DEMO_MODE is true)
// ═══════════════════════════════════════════════════════════════════════════════

const DEMO_DATA = {
    courses: [
        {
            id: 'course_001',
            title: 'Complete Web Development Bootcamp 2024',
            slug: 'complete-web-development-bootcamp',
            shortDescription: 'Learn HTML, CSS, JavaScript, React, Node.js and more!',
            description: `<p>Become a full-stack web developer with this comprehensive bootcamp. This course covers everything from the basics of HTML and CSS to advanced React and Node.js development.</p>
            <p>You'll build real-world projects and gain hands-on experience with modern web technologies.</p>`,
            price: 4999,
            discountPrice: 999,
            thumbnail: '',
            category: 'development',
            level: 'beginner',
            language: 'Hindi & English',
            instructor: 'Vikas Kumar',
            instructorImage: '',
            instructorBio: 'Senior Software Engineer with 10+ years experience. Previously worked at Google and Microsoft.',
            totalLessons: 150,
            totalDuration: '45 hours',
            validity: 365,
            rating: 4.8,
            reviewCount: 1250,
            enrolledCount: 5420,
            requirements: ['Basic computer knowledge', 'No programming experience needed', 'A computer with internet'],
            whatYouLearn: [
                'Build responsive websites from scratch',
                'Master JavaScript and modern ES6+ features',
                'Create full-stack applications with React and Node.js',
                'Work with databases like MongoDB',
                'Deploy your applications to the cloud',
                'Build a professional portfolio'
            ],
            isFeatured: true,
            isPublished: true,
            sections: [
                {
                    id: 'sec_001',
                    title: 'Getting Started',
                    order: 1,
                    lessons: [
                        { id: 'les_001', title: 'Welcome to the Course', duration: '5:30', isFree: true, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_002', title: 'How to Get the Most Out of This Course', duration: '8:15', isFree: true, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_003', title: 'Setting Up Your Development Environment', duration: '15:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' }
                    ]
                },
                {
                    id: 'sec_002',
                    title: 'HTML Fundamentals',
                    order: 2,
                    lessons: [
                        { id: 'les_004', title: 'Introduction to HTML', duration: '12:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_005', title: 'HTML Document Structure', duration: '10:30', isFree: false, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_006', title: 'Working with Text Elements', duration: '14:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_007', title: 'Links and Images', duration: '11:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' }
                    ]
                },
                {
                    id: 'sec_003',
                    title: 'CSS Styling',
                    order: 3,
                    lessons: [
                        { id: 'les_008', title: 'Introduction to CSS', duration: '10:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_009', title: 'Selectors and Properties', duration: '15:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_010', title: 'Box Model Deep Dive', duration: '12:00', isFree: false, youtubeId: 'dQw4w9WgXcQ' }
                    ]
                }
            ]
        },
        {
            id: 'course_002',
            title: 'UI/UX Design Masterclass',
            slug: 'ui-ux-design-masterclass',
            shortDescription: 'Master Figma and create stunning user interfaces',
            description: '<p>Learn professional UI/UX design from scratch. Master Figma, design systems, user research, and create portfolio-worthy projects.</p>',
            price: 3999,
            discountPrice: 799,
            thumbnail: '',
            category: 'design',
            level: 'beginner',
            language: 'Hindi',
            instructor: 'Neha Singh',
            instructorImage: '',
            instructorBio: 'Lead Designer at Figma with 8+ years of experience in product design.',
            totalLessons: 85,
            totalDuration: '28 hours',
            validity: 365,
            rating: 4.9,
            reviewCount: 890,
            enrolledCount: 3200,
            requirements: ['No design experience needed', 'Computer with Figma installed (free)'],
            whatYouLearn: [
                'Master Figma from basics to advanced',
                'Understand UI/UX design principles',
                'Create design systems',
                'Build mobile and web app designs',
                'Conduct user research',
                'Create a professional portfolio'
            ],
            isFeatured: true,
            isPublished: true,
            sections: [
                {
                    id: 'sec_101',
                    title: 'Introduction to Design',
                    order: 1,
                    lessons: [
                        { id: 'les_101', title: 'Welcome to UI/UX Design', duration: '6:00', isFree: true, youtubeId: 'dQw4w9WgXcQ' },
                        { id: 'les_102', title: 'Setting Up Figma', duration: '10:00', isFree: true, youtubeId: 'dQw4w9WgXcQ' }
                    ]
                }
            ]
        },
        {
            id: 'course_003',
            title: 'Digital Marketing Complete Course',
            slug: 'digital-marketing-complete',
            shortDescription: 'SEO, Social Media, Google Ads, Facebook Ads & more',
            description: '<p>Comprehensive digital marketing course covering all aspects of online marketing.</p>',
            price: 2999,
            discountPrice: 599,
            thumbnail: '',
            category: 'marketing',
            level: 'beginner',
            language: 'Hindi & English',
            instructor: 'Amit Patel',
            instructorImage: '',
            instructorBio: 'Digital Marketing Expert with experience at major agencies.',
            totalLessons: 120,
            totalDuration: '35 hours',
            validity: 365,
            rating: 4.7,
            reviewCount: 650,
            enrolledCount: 2800,
            requirements: ['Basic internet knowledge'],
            whatYouLearn: [
                'Master SEO and rank on Google',
                'Run effective Google Ads campaigns',
                'Social media marketing strategies',
                'Email marketing automation',
                'Content marketing',
                'Analytics and reporting'
            ],
            isFeatured: true,
            isPublished: true,
            sections: []
        },
        {
            id: 'course_004',
            title: 'Data Science with Python',
            slug: 'data-science-python',
            shortDescription: 'Python, Pandas, NumPy, Machine Learning & AI',
            description: '<p>Learn data science and machine learning with Python.</p>',
            price: 5999,
            discountPrice: 1299,
            thumbnail: '',
            category: 'data-science',
            level: 'intermediate',
            language: 'English',
            instructor: 'Raj Patel',
            instructorImage: '',
            instructorBio: 'ML Engineer at Microsoft with PhD in AI.',
            totalLessons: 180,
            totalDuration: '55 hours',
            validity: 365,
            rating: 4.8,
            reviewCount: 420,
            enrolledCount: 1850,
            requirements: ['Basic Python knowledge', 'Basic math understanding'],
            whatYouLearn: [
                'Python programming for data science',
                'Data analysis with Pandas and NumPy',
                'Data visualization',
                'Machine learning algorithms',
                'Deep learning basics',
                'Real-world projects'
            ],
            isFeatured: true,
            isPublished: true,
            sections: []
        },
        {
            id: 'course_005',
            title: 'React Native Mobile App Development',
            slug: 'react-native-mobile-development',
            shortDescription: 'Build iOS & Android apps with React Native',
            description: '<p>Create cross-platform mobile applications using React Native.</p>',
            price: 4499,
            discountPrice: 899,
            thumbnail: '',
            category: 'development',
            level: 'intermediate',
            language: 'Hindi & English',
            instructor: 'Vikas Kumar',
            instructorImage: '',
            instructorBio: 'Senior Software Engineer with 10+ years experience.',
            totalLessons: 95,
            totalDuration: '32 hours',
            validity: 365,
            rating: 4.6,
            reviewCount: 380,
            enrolledCount: 1420,
            requirements: ['JavaScript knowledge', 'React basics helpful'],
            whatYouLearn: [
                'React Native fundamentals',
                'Build iOS and Android apps',
                'Navigation and routing',
                'State management',
                'Native modules',
                'App deployment'
            ],
            isFeatured: false,
            isPublished: true,
            sections: []
        },
        {
            id: 'course_006',
            title: 'Business Strategy & Management',
            slug: 'business-strategy-management',
            shortDescription: 'MBA-level business concepts for entrepreneurs',
            description: '<p>Learn essential business strategies and management skills.</p>',
            price: 3499,
            discountPrice: 699,
            thumbnail: '',
            category: 'business',
            level: 'beginner',
            language: 'Hindi',
            instructor: 'Priya Sharma',
            instructorImage: '',
            instructorBio: 'Business consultant and former McKinsey analyst.',
            totalLessons: 60,
            totalDuration: '18 hours',
            validity: 180,
            rating: 4.5,
            reviewCount: 290,
            enrolledCount: 980,
            requirements: ['Interest in business'],
            whatYouLearn: [
                'Business strategy frameworks',
                'Financial management basics',
                'Marketing fundamentals',
                'Leadership skills',
                'Operations management',
                'Business planning'
            ],
            isFeatured: false,
            isPublished: true,
            sections: []
        }
    ],
    
    categories: [
        { id: 'development', name: 'Development', icon: '💻', count: 15 },
        { id: 'design', name: 'Design', icon: '🎨', count: 10 },
        { id: 'marketing', name: 'Marketing', icon: '📈', count: 8 },
        { id: 'business', name: 'Business', icon: '💼', count: 12 },
        { id: 'data-science', name: 'Data Science', icon: '📊', count: 7 },
        { id: 'mobile', name: 'Mobile Dev', icon: '📱', count: 5 }
    ],
    
    reviews: [
        {
            id: 'rev_001',
            courseId: 'course_001',
            userId: 'user_001',
            userName: 'Rahul Kumar',
            rating: 5,
            text: 'Amazing course! The instructor explains everything so clearly. I went from zero coding knowledge to building full-stack apps.',
            date: '2024-01-15'
        },
        {
            id: 'rev_002',
            courseId: 'course_001',
            userId: 'user_002',
            userName: 'Priya Sharma',
            rating: 5,
            text: 'Best investment I made in my career. The projects are practical and industry-relevant.',
            date: '2024-01-10'
        },
        {
            id: 'rev_003',
            courseId: 'course_001',
            userId: 'user_003',
            userName: 'Amit Singh',
            rating: 4,
            text: 'Great content, very comprehensive. Would love more advanced topics.',
            date: '2024-01-05'
        }
    ],
    
    coupons: [
        { code: 'WELCOME50', discountType: 'percent', discountValue: 50, minPurchase: 500 },
        { code: 'FLAT200', discountType: 'fixed', discountValue: 200, minPurchase: 1000 },
        { code: 'NEWYEAR', discountType: 'percent', discountValue: 30, minPurchase: 0 }
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

const Utils = {
    // Generate unique ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    
    // Generate device fingerprint
    generateDeviceId() {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.DEVICE_ID);
        if (stored) return stored;
        
        const deviceId = this.generateId('device');
        localStorage.setItem(CONFIG.STORAGE_KEYS.DEVICE_ID, deviceId);
        return deviceId;
    },
    
    // Format currency
    formatCurrency(amount) {
        return `${CONFIG.CURRENCY_SYMBOL}${amount.toLocaleString('en-IN')}`;
    },
    
    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    },
    
    // Format duration
    formatDuration(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
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
    
    // Slugify string
    slugify(text) {
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },
    
    // Get initials from name
    getInitials(name) {
        return name.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    },
    
    // Calculate discount percentage
    calculateDiscount(original, discounted) {
        return Math.round(((original - discounted) / original) * 100);
    },
    
    // Simple hash function (for demo purposes - not secure!)
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    },
    
    // Validate email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Validate phone (Indian)
    isValidPhone(phone) {
        return /^[6-9]\d{9}$/.test(phone);
    },
    
    // Check password strength
    getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        if (strength <= 2) return { level: 'weak', text: 'Weak', class: 'weak' };
        if (strength === 3) return { level: 'fair', text: 'Fair', class: 'fair' };
        if (strength === 4) return { level: 'good', text: 'Good', class: 'good' };
        return { level: 'strong', text: 'Strong', class: 'strong' };
    },
    
    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Parse query string
    parseQueryString(queryString) {
        const params = {};
        const searchParams = new URLSearchParams(queryString);
        for (const [key, value] of searchParams) {
            params[key] = value;
        }
        return params;
    },
    
    // Build query string
    buildQueryString(params) {
        return Object.entries(params)
            .filter(([, value]) => value !== null && value !== undefined && value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// STORAGE MANAGER
// ═══════════════════════════════════════════════════════════════════════════════

const Storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    },
    
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },
    
    remove(key) {
        localStorage.removeItem(key);
    },
    
    clear() {
        localStorage.clear();
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// API SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

const API = {
    // Base request function
    async request(action, data = {}) {
        // If demo mode, use local data
        if (CONFIG.DEMO_MODE) {
            return this.handleDemoRequest(action, data);
        }
        
        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action,
                    data,
                    token: Auth.getToken(),
                    deviceId: Utils.generateDeviceId()
                })
            });
            
            const result = await response.json();
            
            if (!result.success && result.error === 'UNAUTHORIZED') {
                Auth.logout();
                Router.navigate('/login');
            }
            
            return result;
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Demo mode handler
    async handleDemoRequest(action, data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        switch (action) {
            case 'getCourses':
                return { success: true, data: DEMO_DATA.courses.filter(c => c.isPublished) };
                
            case 'getCourse':
                const course = DEMO_DATA.courses.find(c => c.id === data.courseId || c.slug === data.slug);
                return course ? { success: true, data: course } : { success: false, error: 'Course not found' };
                
            case 'getFeaturedCourses':
                return { success: true, data: DEMO_DATA.courses.filter(c => c.isFeatured && c.isPublished) };
                
            case 'getCategories':
                return { success: true, data: DEMO_DATA.categories };
                
            case 'searchCourses':
                const query = data.query.toLowerCase();
                const results = DEMO_DATA.courses.filter(c => 
                    c.title.toLowerCase().includes(query) || 
                    c.shortDescription.toLowerCase().includes(query)
                );
                return { success: true, data: results };
                
            case 'register':
                // Demo registration
                const newUser = {
                    id: Utils.generateId('user'),
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    createdAt: new Date().toISOString()
                };
                return { 
                    success: true, 
                    data: { 
                        user: newUser, 
                        token: Utils.generateId('token') 
                    }
                };
                
            case 'login':
                // Demo login (any email/password works)
                const demoUser = {
                    id: 'user_demo',
                    name: 'Demo User',
                    email: data.email,
                    phone: '9876543210',
                    createdAt: new Date().toISOString()
                };
                return { 
                    success: true, 
                    data: { 
                        user: demoUser, 
                        token: Utils.generateId('token') 
                    }
                };
                
            case 'getEnrollments':
                return { success: true, data: Storage.get('demo_enrollments') || [] };
                
            case 'createOrder':
                return {
                    success: true,
                    data: {
                        orderId: Utils.generateId('order'),
                        razorpayOrderId: 'order_demo_' + Date.now(),
                        amount: data.amount,
                        currency: 'INR'
                    }
                };
                
            case 'verifyPayment':
                // Demo: Always successful payment
                const enrollments = Storage.get('demo_enrollments') || [];
                const courseData = DEMO_DATA.courses.find(c => c.id === data.courseId);
                if (courseData) {
                    enrollments.push({
                        id: Utils.generateId('enroll'),
                        courseId: data.courseId,
                        courseName: courseData.title,
                        enrolledAt: new Date().toISOString(),
                        expiresAt: new Date(Date.now() + courseData.validity * 24 * 60 * 60 * 1000).toISOString(),
                        progress: 0,
                        completedLessons: []
                    });
                    Storage.set('demo_enrollments', enrollments);
                }
                return { success: true, data: { enrolled: true } };
                
            case 'getVideoToken':
                return { 
                    success: true, 
                    data: { 
                        token: Utils.generateId('vtoken'),
                        youtubeId: data.lessonId ? 'dQw4w9WgXcQ' : null,
                        expiresAt: Date.now() + CONFIG.VIDEO_TOKEN_EXPIRY * 60 * 1000
                    }
                };
                
            case 'validateCoupon':
                const coupon = DEMO_DATA.coupons.find(c => c.code.toUpperCase() === data.code.toUpperCase());
                return coupon ? { success: true, data: coupon } : { success: false, error: 'Invalid coupon code' };
                
            case 'getReviews':
                const reviews = DEMO_DATA.reviews.filter(r => r.courseId === data.courseId);
                return { success: true, data: reviews };
                
            default:
                return { success: false, error: 'Unknown action' };
        }
    },
    
    // Convenience methods
    async getCourses(filters = {}) {
        return this.request('getCourses', filters);
    },
    
    async getCourse(slug) {
        return this.request('getCourse', { slug });
    },
    
    async getFeaturedCourses() {
        return this.request('getFeaturedCourses');
    },
    
    async searchCourses(query) {
        return this.request('searchCourses', { query });
    },
    
    async getEnrollments() {
        return this.request('getEnrollments');
    },
    
    async createOrder(courseId, amount, couponCode = null) {
        return this.request('createOrder', { courseId, amount, couponCode });
    },
    
    async verifyPayment(paymentData) {
        return this.request('verifyPayment', paymentData);
    },
    
    async getVideoToken(lessonId, courseId) {
        return this.request('getVideoToken', { lessonId, courseId });
    },
    
    async validateCoupon(code, courseId) {
        return this.request('validateCoupon', { code, courseId });
    },
    
    async getReviews(courseId) {
        return this.request('getReviews', { courseId });
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════════

const Auth = {
    // Get current token
    getToken() {
        return Storage.get(CONFIG.STORAGE_KEYS.TOKEN);
    },
    
    // Get current user
    getUser() {
        return Storage.get(CONFIG.STORAGE_KEYS.USER);
    },
    
    // Check if user is logged in
    isLoggedIn() {
        return !!this.getToken() && !!this.getUser();
    },
    
    // Login
    async login(email, password) {
        const result = await API.request('login', { email, password });
        
        if (result.success) {
            Storage.set(CONFIG.STORAGE_KEYS.TOKEN, result.data.token);
            Storage.set(CONFIG.STORAGE_KEYS.USER, result.data.user);
            this.updateUI();
        }
        
        return result;
    },
    
    // Register
    async register(name, email, phone, password) {
        const result = await API.request('register', { name, email, phone, password });
        
        if (result.success) {
            Storage.set(CONFIG.STORAGE_KEYS.TOKEN, result.data.token);
            Storage.set(CONFIG.STORAGE_KEYS.USER, result.data.user);
            this.updateUI();
        }
        
        return result;
    },
    
    // Logout
    logout() {
        Storage.remove(CONFIG.STORAGE_KEYS.TOKEN);
        Storage.remove(CONFIG.STORAGE_KEYS.USER);
        this.updateUI();
        Router.navigate('/');
        Toast.success('Logged Out', 'You have been logged out successfully');
    },
    
    // Update UI based on auth state
    updateUI() {
        const authButtons = document.getElementById('navAuthButtons');
        const userMenu = document.getElementById('navUserMenu');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const mobileAuthButtons = document.getElementById('mobileAuthButtons');
        
        if (this.isLoggedIn()) {
            const user = this.getUser();
            
            if (authButtons) authButtons.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userName) userName.textContent = user.name.split(' ')[0];
            if (userAvatar) {
                userAvatar.src = user.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`;
            }
            if (mobileAuthButtons) mobileAuthButtons.classList.add('hidden');
        } else {
            if (authButtons) authButtons.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
            if (mobileAuthButtons) mobileAuthButtons.classList.remove('hidden');
        }
    },
    
    // Check if user is enrolled in a course
    async isEnrolled(courseId) {
        if (!this.isLoggedIn()) return false;
        
        const result = await API.getEnrollments();
        if (result.success) {
            return result.data.some(e => e.courseId === courseId);
        }
        return false;
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toastContainer');
    },
    
    show(type, title, message, duration = 5000) {
        if (!this.container) this.init();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconSvg = this.getIcon(type);
        
        toast.innerHTML = `
            <div class="toast-icon">${iconSvg}</div>
            <div class="toast-content">
                <div class="toast-title">${Utils.escapeHtml(title)}</div>
                ${message ? `<div class="toast-message">${Utils.escapeHtml(message)}</div>` : ''}
            </div>
            <button class="toast-close">&times;</button>
            <div class="toast-progress"></div>
        `;
        
        // Close button handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.hide(toast);
        });
        
        this.container.appendChild(toast);
        
        // Auto hide
        if (duration > 0) {
            setTimeout(() => this.hide(toast), duration);
        }
        
        return toast;
    },
    
    hide(toast) {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    },
    
    getIcon(type) {
        const icons = {
            success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        return icons[type] || icons.info;
    },
    
    success(title, message) {
        return this.show('success', title, message);
    },
    
    error(title, message) {
        return this.show('error', title, message);
    },
    
    warning(title, message) {
        return this.show('warning', title, message);
    },
    
    info(title, message) {
        return this.show('info', title, message);
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════════════════════

const Modal = {
    overlay: null,
    modal: null,
    content: null,
    
    init() {
        this.overlay = document.getElementById('modalOverlay');
        this.modal = document.getElementById('modal');
        this.content = document.getElementById('modalContent');
        
        // Close on overlay click
        this.overlay?.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        
        // Close on button click
        document.getElementById('modalClose')?.addEventListener('click', () => this.close());
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay?.classList.contains('show')) {
                this.close();
            }
        });
    },
    
    open(content, options = {}) {
        if (!this.overlay) this.init();
        
        if (typeof content === 'string') {
            this.content.innerHTML = content;
        } else {
            this.content.innerHTML = '';
            this.content.appendChild(content);
        }
        
        if (options.width) {
            this.modal.style.maxWidth = options.width;
        }
        
        this.overlay.classList.add('show');
        document.body.classList.add('no-scroll');
    },
    
    close() {
        this.overlay?.classList.remove('show');
        document.body.classList.remove('no-scroll');
    },
    
    confirm(title, message, onConfirm, onCancel) {
        const html = `
            <div class="modal-header">
                <h3 class="modal-title">${Utils.escapeHtml(title)}</h3>
            </div>
            <div class="modal-body">
                <p>${Utils.escapeHtml(message)}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-ghost" id="modalCancel">Cancel</button>
                <button class="btn btn-primary" id="modalConfirm">Confirm</button>
            </div>
        `;
        
        this.open(html);
        
        document.getElementById('modalCancel').addEventListener('click', () => {
            this.close();
            if (onCancel) onCancel();
        });
        
        document.getElementById('modalConfirm').addEventListener('click', () => {
            this.close();
            if (onConfirm) onConfirm();
        });
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTER (SPA Navigation)
// ═══════════════════════════════════════════════════════════════════════════════

const Router = {
    routes: {},
    currentRoute: null,
    
    init() {
        // Define routes
        this.routes = {
            '/': { template: 'homePage', title: 'Home', handler: Pages.home },
            '/courses': { template: 'coursesPage', title: 'Courses', handler: Pages.courses },
            '/course/:slug': { template: 'courseDetailPage', title: 'Course', handler: Pages.courseDetail },
            '/learn/:courseId/:lessonId': { template: 'videoPlayerPage', title: 'Learning', handler: Pages.videoPlayer, auth: true },
            '/login': { template: 'loginPage', title: 'Login', handler: Pages.login, guest: true },
            '/register': { template: 'registerPage', title: 'Register', handler: Pages.register, guest: true },
            '/forgot-password': { template: 'forgotPasswordPage', title: 'Forgot Password', handler: Pages.forgotPassword, guest: true },
            '/dashboard': { template: 'dashboardPage', title: 'Dashboard', handler: Pages.dashboard, auth: true },
            '/my-courses': { template: 'myCoursesPage', title: 'My Courses', handler: Pages.myCourses, auth: true },
            '/wishlist': { template: 'dashboardPage', title: 'Wishlist', handler: Pages.wishlist, auth: true },
            '/certificates': { template: 'certificatesPage', title: 'Certificates', handler: Pages.certificates, auth: true },
            '/settings': { template: 'settingsPage', title: 'Settings', handler: Pages.settings, auth: true },
            '/checkout/:courseId': { template: 'checkoutPage', title: 'Checkout', handler: Pages.checkout, auth: true },
            '/payment-success': { template: 'paymentSuccessPage', title: 'Payment Successful', handler: Pages.paymentSuccess },
            '/about': { template: 'aboutPage', title: 'About Us', handler: Pages.about },
            '/contact': { template: 'contactPage', title: 'Contact', handler: Pages.contact },
            '/help': { template: 'aboutPage', title: 'Help', handler: Pages.help },
            '/terms': { template: 'aboutPage', title: 'Terms of Service', handler: Pages.terms },
            '/privacy': { template: 'aboutPage', title: 'Privacy Policy', handler: Pages.privacy }
        };
        
        // Listen for hash changes
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();
        
        // Handle link clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-link]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) this.navigate(href.replace('#', ''));
            }
        });
    },
    
    handleRoute() {
        const hash = window.location.hash.slice(1) || '/';
        const [path, queryString] = hash.split('?');
        const params = queryString ? Utils.parseQueryString(queryString) : {};
        
        // Find matching route
        let matchedRoute = null;
        let routeParams = {};
        
        for (const [pattern, route] of Object.entries(this.routes)) {
            const match = this.matchRoute(pattern, path);
            if (match) {
                matchedRoute = route;
                routeParams = match;
                break;
            }
        }
        
        if (!matchedRoute) {
            // 404
            this.render404();
            return;
        }
        
        // Check auth requirements
        if (matchedRoute.auth && !Auth.isLoggedIn()) {
            this.navigate('/login');
            Toast.warning('Login Required', 'Please login to access this page');
            return;
        }
        
        if (matchedRoute.guest && Auth.isLoggedIn()) {
            this.navigate('/dashboard');
            return;
        }
        
        // Update current route
        this.currentRoute = {
            ...matchedRoute,
            path,
            params: routeParams,
            query: params
        };
        
        // Render page
        this.renderPage(matchedRoute, routeParams, params);
    },
    
    matchRoute(pattern, path) {
        const patternParts = pattern.split('/');
        const pathParts = path.split('/');
        
        if (patternParts.length !== pathParts.length) return null;
        
        const params = {};
        
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                params[patternParts[i].slice(1)] = pathParts[i];
            } else if (patternParts[i] !== pathParts[i]) {
                return null;
            }
        }
        
        return params;
    },
    
    async renderPage(route, params, query) {
        const app = document.getElementById('app');
        const template = document.getElementById(route.template);
        
        if (!template) {
            console.error('Template not found:', route.template);
            this.render404();
            return;
        }
        
        // Show loader
        app.innerHTML = '<div class="page-loading"><div class="spinner"></div></div>';
        
        // Clone template content
        const content = template.content.cloneNode(true);
        
        // Clear app and append new content
        app.innerHTML = '';
        app.appendChild(content);
        
        // Update page title
        document.title = `${route.title} | ${CONFIG.SITE_NAME}`;
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Call page handler
        if (route.handler) {
            try {
                await route.handler(params, query);
            } catch (error) {
                console.error('Page handler error:', error);
                Toast.error('Error', 'Something went wrong loading the page');
            }
        }
        
        // Update active nav link
        this.updateActiveNav();
        
        // Close mobile menu
        document.getElementById('mobileMenu')?.classList.remove('show');
        document.getElementById('navToggle')?.classList.remove('active');
        
        // Initialize animations
        UI.initScrollAnimations();
    },
    
    render404() {
        const app = document.getElementById('app');
        const template = document.getElementById('notFoundPage');
        
        if (template) {
            app.innerHTML = '';
            app.appendChild(template.content.cloneNode(true));
        } else {
            app.innerHTML = `
                <div class="error-section">
                    <div class="container">
                        <div class="error-content">
                            <h1 class="error-code">404</h1>
                            <h2 class="error-title">Page Not Found</h2>
                            <p class="error-message">The page you're looking for doesn't exist.</p>
                            <a href="#/" class="btn btn-primary btn-lg" data-link>Back to Home</a>
                        </div>
                    </div>
                </div>
            `;
        }
        
        document.title = `404 - Page Not Found | ${CONFIG.SITE_NAME}`;
    },
    
    navigate(path) {
        window.location.hash = path;
    },
    
    updateActiveNav() {
        const path = this.currentRoute?.path || '/';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            if (href === path || (path.startsWith(href) && href !== '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE HANDLERS
// ═══════════════════════════════════════════════════════════════════════════════

const Pages = {
    // HOME PAGE
    async home() {
        // Load featured courses
        const result = await API.getFeaturedCourses();
        
        if (result.success) {
            const grid = document.getElementById('featuredCoursesGrid');
            if (grid) {
                grid.innerHTML = result.data.map(course => Components.courseCard(course)).join('');
            }
        }
        
        // Initialize category filter
        const filterButtons = document.querySelectorAll('#categoryFilter .filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Pages.filterFeaturedCourses(btn.dataset.category);
            });
        });
        
        // Initialize category cards
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                Router.navigate(`/courses?category=${card.dataset.category}`);
            });
        });
        
        // Initialize testimonials slider
        UI.initTestimonialsSlider();
        
        // Initialize FAQ accordions
        UI.initAccordions();
        
        // Initialize stats counter
        UI.initStatsCounter();
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        newsletterForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            Toast.success('Subscribed!', 'Thank you for subscribing to our newsletter');
            newsletterForm.reset();
        });
    },
    
    async filterFeaturedCourses(category) {
        const result = await API.getFeaturedCourses();
        
        if (result.success) {
            let courses = result.data;
            
            if (category !== 'all') {
                courses = courses.filter(c => c.category === category);
            }
            
            const grid = document.getElementById('featuredCoursesGrid');
            if (grid) {
                if (courses.length === 0) {
                    grid.innerHTML = '<p class="text-center text-muted">No courses found in this category</p>';
                } else {
                    grid.innerHTML = courses.map(course => Components.courseCard(course)).join('');
                }
            }
        }
    },
    
    // COURSES PAGE
    async courses(params, query) {
        const grid = document.getElementById('allCoursesGrid');
        const countEl = document.getElementById('coursesCount');
        
        // Show loading
        if (grid) {
            grid.innerHTML = Array(6).fill('<div class="skeleton-card"></div>').join('');
        }
        
        // Load courses
        const result = await API.getCourses(query);
        
        if (result.success) {
            let courses = result.data;
            
            // Apply filters
            courses = Pages.applyFilters(courses, query);
            
            // Update count
            if (countEl) countEl.textContent = courses.length;
            
            // Render courses
            if (grid) {
                if (courses.length === 0) {
                    document.getElementById('emptyCoursesState')?.classList.remove('hidden');
                    grid.innerHTML = '';
                } else {
                    document.getElementById('emptyCoursesState')?.classList.add('hidden');
                    grid.innerHTML = courses.map(course => Components.courseCard(course)).join('');
                }
            }
        }
        
        // Initialize filters
        Pages.initCourseFilters();
    },
    
    applyFilters(courses, filters) {
        let filtered = [...courses];
        
        if (filters.category) {
            filtered = filtered.filter(c => c.category === filters.category);
        }
        
        if (filters.level) {
            filtered = filtered.filter(c => c.level === filters.level);
        }
        
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(c => 
                c.title.toLowerCase().includes(query) ||
                c.shortDescription.toLowerCase().includes(query)
            );
        }
        
        if (filters.sort) {
            switch (filters.sort) {
                case 'price-low':
                    filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                    break;
                case 'price-high':
                    filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                    break;
                case 'rating':
                    filtered.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
            }
        }
        
        return filtered;
    },
    
    initCourseFilters() {
        // Search input
        const searchInput = document.getElementById('courseSearchInput');
        searchInput?.addEventListener('input', Utils.debounce((e) => {
            const currentQuery = Router.currentRoute?.query || {};
            currentQuery.search = e.target.value;
            Router.navigate('/courses?' + Utils.buildQueryString(currentQuery));
        }, 500));
        
        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        sortSelect?.addEventListener('change', (e) => {
            const currentQuery = Router.currentRoute?.query || {};
            currentQuery.sort = e.target.value;
            Router.navigate('/courses?' + Utils.buildQueryString(currentQuery));
        });
        
        // Category checkboxes
        document.querySelectorAll('input[name="category"]').forEach(input => {
            input.addEventListener('change', () => {
                const checked = document.querySelectorAll('input[name="category"]:checked');
                const categories = Array.from(checked).map(c => c.value).join(',');
                const currentQuery = Router.currentRoute?.query || {};
                currentQuery.category = categories;
                Router.navigate('/courses?' + Utils.buildQueryString(currentQuery));
            });
        });
        
        // Level checkboxes
        document.querySelectorAll('input[name="level"]').forEach(input => {
            input.addEventListener('change', () => {
                const checked = document.querySelectorAll('input[name="level"]:checked');
                const levels = Array.from(checked).map(c => c.value).join(',');
                const currentQuery = Router.currentRoute?.query || {};
                currentQuery.level = levels;
                Router.navigate('/courses?' + Utils.buildQueryString(currentQuery));
            });
        });
        
        // Price range
        const priceRange = document.getElementById('priceRange');
        const maxPriceValue = document.getElementById('maxPriceValue');
        priceRange?.addEventListener('input', (e) => {
            if (maxPriceValue) maxPriceValue.textContent = Utils.formatCurrency(parseInt(e.target.value));
        });
        
        // Clear filters
        document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
            Router.navigate('/courses');
        });
        
        document.getElementById('resetFiltersBtn')?.addEventListener('click', () => {
            Router.navigate('/courses');
        });
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const grid = document.getElementById('allCoursesGrid');
                if (grid) {
                    grid.classList.toggle('list-view', btn.dataset.view === 'list');
                }
            });
        });
        
        // Mobile filter toggle
        document.getElementById('filterToggleBtn')?.addEventListener('click', () => {
            document.getElementById('filtersSidebar')?.classList.toggle('show');
        });
    },
    
    // COURSE DETAIL PAGE
    async courseDetail(params) {
        const container = document.getElementById('courseDetailContent');
        if (!container) return;
        
        // Show loading
        container.innerHTML = '<div class="page-loading"><div class="spinner"></div></div>';
        
        // Load course data
        const result = await API.getCourse(params.slug);
        
        if (!result.success) {
            container.innerHTML = `
                <div class="error-section">
                    <div class="container">
                        <div class="error-content">
                            <h1 class="error-code">404</h1>
                            <h2>Course Not Found</h2>
                            <p>The course you're looking for doesn't exist.</p>
                            <a href="#/courses" class="btn btn-primary" data-link>Browse Courses</a>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        const course = result.data;
        const isEnrolled = await Auth.isEnrolled(course.id);
        
        // Update page title
        document.title = `${course.title} | ${CONFIG.SITE_NAME}`;
        
        // Render course detail
        container.innerHTML = Components.courseDetailPage(course, isEnrolled);
        
        // Initialize tabs
        UI.initTabs();
        
        // Initialize curriculum accordions
        UI.initAccordions();
        
        // Load reviews
        const reviewsResult = await API.getReviews(course.id);
        if (reviewsResult.success) {
            const reviewsList = document.getElementById('reviewsList');
            if (reviewsList) {
                reviewsList.innerHTML = reviewsResult.data.map(review => Components.reviewCard(review)).join('');
            }
        }
        
        // Handle enroll/buy button
        document.getElementById('enrollBtn')?.addEventListener('click', () => {
            if (isEnrolled) {
                // Go to first lesson
                const firstLesson = course.sections?.[0]?.lessons?.[0];
                if (firstLesson) {
                    Router.navigate(`/learn/${course.id}/${firstLesson.id}`);
                }
            } else if (Auth.isLoggedIn()) {
                Router.navigate(`/checkout/${course.id}`);
            } else {
                Toast.info('Login Required', 'Please login to enroll in this course');
                Router.navigate('/login');
            }
        });
        
        document.getElementById('buyNowBtn')?.addEventListener('click', () => {
            if (Auth.isLoggedIn()) {
                Router.navigate(`/checkout/${course.id}`);
            } else {
                Toast.info('Login Required', 'Please login to purchase this course');
                Router.navigate('/login');
            }
        });
    },
    
    // VIDEO PLAYER PAGE
    async videoPlayer(params) {
        const container = document.getElementById('videoPlayerContent');
        if (!container) return;
        
        // Check enrollment
        const isEnrolled = await Auth.isEnrolled(params.courseId);
        
        if (!isEnrolled) {
            Toast.error('Access Denied', 'You are not enrolled in this course');
            Router.navigate('/courses');
            return;
        }
        
        // Load course data
        const courseResult = await API.getCourse(params.courseId);
        if (!courseResult.success) {
            Toast.error('Error', 'Course not found');
            Router.navigate('/my-courses');
            return;
        }
        
        const course = courseResult.data;
        
        // Find current lesson
        let currentLesson = null;
        let currentSection = null;
        
        for (const section of course.sections || []) {
            for (const lesson of section.lessons || []) {
                if (lesson.id === params.lessonId) {
                    currentLesson = lesson;
                    currentSection = section;
                    break;
                }
            }
            if (currentLesson) break;
        }
        
        if (!currentLesson) {
            Toast.error('Error', 'Lesson not found');
            Router.navigate('/my-courses');
            return;
        }
        
        // Render video player page
        container.innerHTML = Components.videoPlayerPage(course, currentLesson, currentSection);
        
        // Load video
        await VideoPlayer.init(course, currentLesson);
        
        // Initialize lesson sidebar
        Pages.initLessonSidebar(course, currentLesson);
    },
    
    initLessonSidebar(course, currentLesson) {
        const lessonItems = document.querySelectorAll('.lesson-item-player');
        
        lessonItems.forEach(item => {
            item.addEventListener('click', () => {
                const lessonId = item.dataset.lessonId;
                if (lessonId && !item.classList.contains('locked')) {
                    Router.navigate(`/learn/${course.id}/${lessonId}`);
                }
            });
        });
    },
    
    // LOGIN PAGE
    login() {
        const form = document.getElementById('loginForm');
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const btn = document.getElementById('loginBtn');
            
            // Validate
            if (!Utils.isValidEmail(email)) {
                document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
                return;
            }
            
            // Show loading
            btn.disabled = true;
            btn.querySelector('.btn-text').classList.add('hidden');
            btn.querySelector('.btn-loader').classList.remove('hidden');
            
            // Login
            const result = await Auth.login(email, password);
            
            // Hide loading
            btn.disabled = false;
            btn.querySelector('.btn-text').classList.remove('hidden');
            btn.querySelector('.btn-loader').classList.add('hidden');
            
            if (result.success) {
                Toast.success('Welcome Back!', 'You have logged in successfully');
                Router.navigate('/dashboard');
            } else {
                Toast.error('Login Failed', result.error || 'Invalid email or password');
            }
        });
        
        // Toggle password visibility
        UI.initPasswordToggles();
    },
    
    // REGISTER PAGE
    register() {
        const form = document.getElementById('registerForm');
        const passwordInput = document.getElementById('registerPassword');
        
        // Password strength indicator
        passwordInput?.addEventListener('input', (e) => {
            const strength = Utils.getPasswordStrength(e.target.value);
            const fill = document.getElementById('strengthFill');
            const text = document.getElementById('strengthText');
            
            if (fill) {
                fill.className = `strength-fill ${strength.class}`;
            }
            if (text) {
                text.textContent = strength.text;
                text.className = `strength-text text-${strength.class === 'weak' ? 'error' : strength.class === 'strong' ? 'success' : 'warning'}`;
            }
        });
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const phone = document.getElementById('registerPhone').value;
            const password = document.getElementById('registerPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const btn = document.getElementById('registerBtn');
            
            // Validate
            let hasError = false;
            
            if (name.length < 2) {
                document.getElementById('registerNameError').textContent = 'Name is too short';
                hasError = true;
            }
            
            if (!Utils.isValidEmail(email)) {
                document.getElementById('registerEmailError').textContent = 'Please enter a valid email';
                hasError = true;
            }
            
            if (!Utils.isValidPhone(phone)) {
                document.getElementById('registerPhoneError').textContent = 'Please enter a valid 10-digit phone number';
                hasError = true;
            }
            
            if (password.length < 8) {
                document.getElementById('registerPasswordError').textContent = 'Password must be at least 8 characters';
                hasError = true;
            }
            
            if (!agreeTerms) {
                Toast.error('Terms Required', 'Please agree to the terms and conditions');
                hasError = true;
            }
            
            if (hasError) return;
            
            // Show loading
            btn.disabled = true;
            btn.querySelector('.btn-text').classList.add('hidden');
            btn.querySelector('.btn-loader').classList.remove('hidden');
            
            // Register
            const result = await Auth.register(name, email, phone, password);
            
            // Hide loading
            btn.disabled = false;
            btn.querySelector('.btn-text').classList.remove('hidden');
            btn.querySelector('.btn-loader').classList.add('hidden');
            
            if (result.success) {
                Toast.success('Welcome!', 'Your account has been created successfully');
                Router.navigate('/dashboard');
            } else {
                Toast.error('Registration Failed', result.error || 'Something went wrong');
            }
        });
        
        // Toggle password visibility
        UI.initPasswordToggles();
    },
    
    // FORGOT PASSWORD PAGE
    forgotPassword() {
        const form = document.getElementById('forgotPasswordForm');
        
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail').value;
            const btn = document.getElementById('forgotBtn');
            
            if (!Utils.isValidEmail(email)) {
                document.getElementById('forgotEmailError').textContent = 'Please enter a valid email';
                return;
            }
            
            // Show loading
            btn.disabled = true;
            btn.querySelector('.btn-text').classList.add('hidden');
            btn.querySelector('.btn-loader').classList.remove('hidden');
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Hide loading
            btn.disabled = false;
            btn.querySelector('.btn-text').classList.remove('hidden');
            btn.querySelector('.btn-loader').classList.add('hidden');
            
            Toast.success('Email Sent', 'If an account exists with this email, you will receive a password reset link');
        });
    },
    
    // DASHBOARD PAGE
    async dashboard() {
        const user = Auth.getUser();
        
        // Set welcome name
        const welcomeName = document.getElementById('welcomeName');
        if (welcomeName) welcomeName.textContent = user?.name?.split(' ')[0] || 'User';
        
        // Set header user info
        const headerAvatar = document.getElementById('headerAvatar');
        const headerUsername = document.getElementById('headerUsername');
        if (headerAvatar) {
            headerAvatar.src = user?.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366f1&color=fff`;
        }
        if (headerUsername) headerUsername.textContent = user?.name?.split(' ')[0] || 'User';
        
        // Load enrollments
        const enrollmentsResult = await API.getEnrollments();
        const enrollments = enrollmentsResult.success ? enrollmentsResult.data : [];
        
        // Update stats
        document.getElementById('enrolledCount').textContent = enrollments.length;
        document.getElementById('completedCount').textContent = enrollments.filter(e => e.progress === 100).length;
        document.getElementById('certificatesCount').textContent = enrollments.filter(e => e.progress === 100).length;
        document.getElementById('hoursWatched').textContent = Math.floor(Math.random() * 50) + 5; // Demo data
        
        // Render continue learning
        const continueCourses = document.getElementById('continueCourses');
        if (continueCourses) {
            if (enrollments.length === 0) {
                continueCourses.innerHTML = `
                    <div class="empty-state">
                        <p>You haven't enrolled in any courses yet.</p>
                        <a href="#/courses" class="btn btn-primary" data-link>Browse Courses</a>
                    </div>
                `;
            } else {
                continueCourses.innerHTML = enrollments.slice(0, 3).map(enrollment => {
                    const course = DEMO_DATA.courses.find(c => c.id === enrollment.courseId);
                    if (!course) return '';
                    
                    return `
                        <div class="continue-card" onclick="Router.navigate('/learn/${course.id}/${course.sections?.[0]?.lessons?.[0]?.id || ''}')">
                            <div class="continue-thumbnail">${course.category === 'development' ? '💻' : course.category === 'design' ? '🎨' : '📚'}</div>
                            <div class="continue-info">
                                <h4 class="continue-title">${Utils.escapeHtml(course.title)}</h4>
                                <div class="continue-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${enrollment.progress || 0}%"></div>
                                    </div>
                                    <span class="progress-text">${enrollment.progress || 0}% complete</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
        
        // Render recommended courses
        const recommendedCourses = document.getElementById('recommendedCourses');
        if (recommendedCourses) {
            const notEnrolledCourses = DEMO_DATA.courses.filter(c => 
                !enrollments.some(e => e.courseId === c.id)
            ).slice(0, 3);
            
            recommendedCourses.innerHTML = notEnrolledCourses.map(course => Components.courseCard(course)).join('');
        }
        
        // Initialize sidebar
        Pages.initDashboardSidebar();
    },
    
    initDashboardSidebar() {
        // Sidebar toggle for mobile
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            document.getElementById('dashboardSidebar')?.classList.toggle('show');
        });
        
        // Logout buttons
        document.getElementById('sidebarLogoutBtn')?.addEventListener('click', () => {
            Auth.logout();
        });
        
        // Theme toggle in header
        document.getElementById('headerThemeToggle')?.addEventListener('click', () => {
            UI.toggleTheme();
        });
    },
    
    // MY COURSES PAGE
    async myCourses() {
        await Pages.dashboard(); // Initialize sidebar and header
        
        const grid = document.getElementById('myCoursesGrid');
        if (!grid) return;
        
        const enrollmentsResult = await API.getEnrollments();
        const enrollments = enrollmentsResult.success ? enrollmentsResult.data : [];
        
        if (enrollments.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>No courses yet</h3>
                    <p>Start learning by enrolling in a course!</p>
                    <a href="#/courses" class="btn btn-primary" data-link>Browse Courses</a>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = enrollments.map(enrollment => {
            const course = DEMO_DATA.courses.find(c => c.id === enrollment.courseId);
            if (!course) return '';
            
            return Components.enrolledCourseCard(course, enrollment);
        }).join('');
        
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Filter logic here
            });
        });
    },
    
    // WISHLIST PAGE
    async wishlist() {
        await Pages.dashboard();
        // Wishlist logic
    },
    
    // CERTIFICATES PAGE
    async certificates() {
        await Pages.dashboard();
        
        const grid = document.getElementById('certificatesGrid');
        const emptyState = document.getElementById('emptyCertificates');
        
        const enrollmentsResult = await API.getEnrollments();
        const completedEnrollments = (enrollmentsResult.data || []).filter(e => e.progress === 100);
        
        if (completedEnrollments.length === 0) {
            grid?.classList.add('hidden');
            emptyState?.classList.remove('hidden');
        } else {
            emptyState?.classList.add('hidden');
            grid?.classList.remove('hidden');
            // Render certificates
        }
    },
    
    // SETTINGS PAGE
    async settings() {
        await Pages.dashboard();
        
        const user = Auth.getUser();
        
        // Populate form
        document.getElementById('settingsName').value = user?.name || '';
        document.getElementById('settingsEmail').value = user?.email || '';
        document.getElementById('settingsPhone').value = user?.phone || '';
        document.getElementById('photoInitials').textContent = Utils.getInitials(user?.name || 'User');
        
        // Settings tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.tab}Panel`)?.classList.add('active');
            });
        });
        
        // Profile form
        document.getElementById('profileForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            Toast.success('Profile Updated', 'Your profile has been updated successfully');
        });
        
        // Password form
        document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            Toast.success('Password Changed', 'Your password has been changed successfully');
        });
    },
    
    // CHECKOUT PAGE
    async checkout(params) {
        const courseResult = await API.getCourse(params.courseId);
        
        if (!courseResult.success) {
            Toast.error('Error', 'Course not found');
            Router.navigate('/courses');
            return;
        }
        
        const course = courseResult.data;
        let appliedCoupon = null;
        let finalAmount = course.discountPrice || course.price;
        
        // Render order item
        const orderItem = document.getElementById('orderItem');
        if (orderItem) {
            orderItem.innerHTML = `
                <div class="order-thumbnail">${course.category === 'development' ? '💻' : '📚'}</div>
                <div class="order-info">
                    <h3>${Utils.escapeHtml(course.title)}</h3>
                    <p>By ${Utils.escapeHtml(course.instructor)} • ${course.totalDuration}</p>
                    <p>Validity: ${course.validity} days</p>
                </div>
            `;
        }
        
        // Update prices
        const updatePrices = () => {
            document.getElementById('originalPrice').textContent = Utils.formatCurrency(course.price);
            
            if (course.discountPrice && course.discountPrice < course.price) {
                document.getElementById('discountRow').style.display = 'flex';
                document.getElementById('discountAmount').textContent = `-${Utils.formatCurrency(course.price - course.discountPrice)}`;
            }
            
            if (appliedCoupon) {
                document.getElementById('couponDiscountRow').style.display = 'flex';
                let couponDiscount = 0;
                if (appliedCoupon.discountType === 'percent') {
                    couponDiscount = Math.floor(finalAmount * appliedCoupon.discountValue / 100);
                } else {
                    couponDiscount = appliedCoupon.discountValue;
                }
                finalAmount -= couponDiscount;
                document.getElementById('couponDiscountAmount').textContent = `-${Utils.formatCurrency(couponDiscount)}`;
            }
            
            document.getElementById('totalPrice').textContent = Utils.formatCurrency(finalAmount);
        };
        
        updatePrices();
        
        // Apply coupon
        document.getElementById('applyCouponBtn')?.addEventListener('click', async () => {
            const code = document.getElementById('couponInput').value.trim();
            if (!code) return;
            
            const result = await API.validateCoupon(code, course.id);
            const messageEl = document.getElementById('couponMessage');
            
            if (result.success) {
                appliedCoupon = result.data;
                messageEl.textContent = `Coupon applied! ${appliedCoupon.discountType === 'percent' ? appliedCoupon.discountValue + '%' : Utils.formatCurrency(appliedCoupon.discountValue)} off`;
                messageEl.className = 'coupon-message success';
                finalAmount = course.discountPrice || course.price;
                updatePrices();
            } else {
                messageEl.textContent = result.error || 'Invalid coupon code';
                messageEl.className = 'coupon-message error';
            }
        });
        
        // Pay now button
        document.getElementById('payNowBtn')?.addEventListener('click', async () => {
            const btn = document.getElementById('payNowBtn');
            btn.disabled = true;
            btn.querySelector('.btn-text')?.classList.add('hidden');
            btn.querySelector('.btn-loader')?.classList.remove('hidden');
            
            // Create order
            const orderResult = await API.createOrder(course.id, finalAmount, appliedCoupon?.code);
            
            if (!orderResult.success) {
                Toast.error('Error', 'Failed to create order');
                btn.disabled = false;
                btn.querySelector('.btn-text')?.classList.remove('hidden');
                btn.querySelector('.btn-loader')?.classList.add('hidden');
                return;
            }
            
            // In demo mode, simulate successful payment
            if (CONFIG.DEMO_MODE) {
                await API.verifyPayment({
                    courseId: course.id,
                    orderId: orderResult.data.orderId
                });
                
                Toast.success('Payment Successful!', 'You have been enrolled in the course');
                Router.navigate('/payment-success?course=' + course.id);
                return;
            }
            
            // Initialize Razorpay
            const options = {
                key: CONFIG.RAZORPAY_KEY_ID,
                amount: finalAmount * 100,
                currency: 'INR',
                name: CONFIG.SITE_NAME,
                description: course.title,
                order_id: orderResult.data.razorpayOrderId,
                handler: async function(response) {
                    // Verify payment
                    const verifyResult = await API.verifyPayment({
                        courseId: course.id,
                        orderId: orderResult.data.orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature
                    });
                    
                    if (verifyResult.success) {
                        Toast.success('Payment Successful!', 'You have been enrolled in the course');
                        Router.navigate('/payment-success?course=' + course.id);
                    } else {
                        Toast.error('Payment Failed', 'Please contact support');
                    }
                },
                prefill: {
                    name: Auth.getUser()?.name,
                    email: Auth.getUser()?.email,
                    contact: Auth.getUser()?.phone
                },
                theme: {
                    color: '#6366f1'
                },
                modal: {
                    ondismiss: function() {
                        btn.disabled = false;
                        btn.querySelector('.btn-text')?.classList.remove('hidden');
                        btn.querySelector('.btn-loader')?.classList.add('hidden');
                    }
                }
            };
            
            const razorpay = new Razorpay(options);
            razorpay.open();
        });
    },
    
    // PAYMENT SUCCESS PAGE
    async paymentSuccess(params, query) {
        const courseId = query.course;
        
        if (courseId) {
            const course = DEMO_DATA.courses.find(c => c.id === courseId);
            
            if (course) {
                const orderDetails = document.getElementById('orderDetails');
                if (orderDetails) {
                    orderDetails.innerHTML = `
                        <div class="order-details-row">
                            <span>Course</span>
                            <span>${Utils.escapeHtml(course.title)}</span>
                        </div>
                        <div class="order-details-row">
                            <span>Amount Paid</span>
                            <span>${Utils.formatCurrency(course.discountPrice || course.price)}</span>
                        </div>
                        <div class="order-details-row">
                            <span>Access Valid Until</span>
                            <span>${Utils.formatDate(new Date(Date.now() + course.validity * 24 * 60 * 60 * 1000))}</span>
                        </div>
                    `;
                }
            }
        }
        
        // Confetti effect
        UI.showConfetti();
    },
    
    // ABOUT PAGE
    about() {
        // Static page, no special handling needed
    },
    
    // CONTACT PAGE
    contact() {
        const form = document.getElementById('contactForm');
        
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            Toast.success('Message Sent', 'We\'ll get back to you within 24 hours');
            form.reset();
        });
    },
    
    // HELP PAGE
    help() {
        // Static page
    },
    
    // TERMS PAGE
    terms() {
        // Static page
    },
    
    // PRIVACY PAGE
    privacy() {
        // Static page
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS (HTML Templates)
// ═══════════════════════════════════════════════════════════════════════════════

const Components = {
    // Course Card
    courseCard(course) {
        const discount = course.discountPrice ? Utils.calculateDiscount(course.price, course.discountPrice) : 0;
        const iconMap = {
            'development': '💻',
            'design': '🎨',
            'marketing': '📈',
            'business': '💼',
            'data-science': '📊',
            'mobile': '📱'
        };
        
        return `
            <div class="course-card" onclick="Router.navigate('/course/${course.slug}')">
                <div class="course-thumbnail">
                    ${course.thumbnail 
                        ? `<img src="${course.thumbnail}" alt="${Utils.escapeHtml(course.title)}">`
                        : `<div class="course-thumbnail-placeholder">${iconMap[course.category] || '📚'}</div>`
                    }
                    <div class="course-play-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </div>
                    <span class="course-badge">${Utils.escapeHtml(course.category)}</span>
                    <button class="course-wishlist" onclick="event.stopPropagation(); Wishlist.toggle('${course.id}')" aria-label="Add to wishlist">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="course-content">
                    <span class="course-category">${Utils.escapeHtml(course.category)}</span>
                    <h3 class="course-title">${Utils.escapeHtml(course.title)}</h3>
                    <div class="course-instructor">
                        <div class="instructor-avatar">${Utils.getInitials(course.instructor)}</div>
                        <span class="instructor-name">${Utils.escapeHtml(course.instructor)}</span>
                    </div>
                    <div class="course-meta">
                        <div class="course-rating">
                            ⭐ <span>${course.rating}</span> (${course.reviewCount})
                        </div>
                        <span>${course.totalDuration}</span>
                        <span>${course.totalLessons} lessons</span>
                    </div>
                    <div class="course-footer">
                        <div class="course-price">
                            <span class="price-current">${Utils.formatCurrency(course.discountPrice || course.price)}</span>
                            ${discount > 0 ? `<span class="price-original">${Utils.formatCurrency(course.price)}</span>` : ''}
                        </div>
                        <button class="course-enroll-btn">View Course</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Enrolled Course Card
    enrolledCourseCard(course, enrollment) {
        return `
            <div class="course-card" onclick="Router.navigate('/learn/${course.id}/${course.sections?.[0]?.lessons?.[0]?.id || ''}')">
                <div class="course-thumbnail">
                    <div class="course-thumbnail-placeholder">${course.category === 'development' ? '💻' : '📚'}</div>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${Utils.escapeHtml(course.title)}</h3>
                    <div class="continue-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${enrollment.progress || 0}%"></div>
                        </div>
                        <span class="progress-text">${enrollment.progress || 0}% complete</span>
                    </div>
                    <p style="font-size: var(--text-xs); color: var(--text-tertiary); margin-top: var(--space-2);">
                        Valid until: ${Utils.formatDate(enrollment.expiresAt)}
                    </p>
                    <div class="course-footer">
                        <button class="btn btn-primary btn-sm">Continue Learning</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Review Card
    reviewCard(review) {
        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">${Utils.getInitials(review.userName)}</div>
                    <div class="review-author">
                        <h4>${Utils.escapeHtml(review.userName)}</h4>
                        <span>${Utils.formatDate(review.date)}</span>
                    </div>
                    <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                </div>
                <p class="review-text">${Utils.escapeHtml(review.text)}</p>
            </div>
        `;
    },
    
    // Course Detail Page
    courseDetailPage(course, isEnrolled) {
        const discount = course.discountPrice ? Utils.calculateDiscount(course.price, course.discountPrice) : 0;
        
        return `
            <!-- Course Hero -->
            <section class="course-hero">
                <div class="container">
                    <div class="course-hero-content">
                        <span class="course-badge">${Utils.escapeHtml(course.category)}</span>
                        <h1 class="course-title">${Utils.escapeHtml(course.title)}</h1>
                        <p class="course-subtitle">${Utils.escapeHtml(course.shortDescription)}</p>
                        <div class="course-hero-meta">
                            <div class="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                ${course.rating} (${course.reviewCount} reviews)
                            </div>
                            <div class="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                ${course.enrolledCount.toLocaleString()} students
                            </div>
                            <div class="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${course.totalDuration}
                            </div>
                            <div class="meta-item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                ${course.totalLessons} lessons
                            </div>
                        </div>
                        <div class="course-instructor" style="margin-top: var(--space-4);">
                            <div class="instructor-avatar" style="width: 40px; height: 40px; font-size: var(--text-sm);">${Utils.getInitials(course.instructor)}</div>
                            <div>
                                <span style="font-weight: 600;">${Utils.escapeHtml(course.instructor)}</span>
                                <span style="display: block; font-size: var(--text-xs); opacity: 0.8;">Instructor</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Purchase Card -->
                    <div class="course-purchase-card">
                        <div class="purchase-thumbnail">
                            <div style="width: 100%; height: 100%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                                ${course.category === 'development' ? '💻' : course.category === 'design' ? '🎨' : '📚'}
                            </div>
                            <div class="play-overlay">
                                <div class="play-btn">
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="purchase-content">
                            <div class="purchase-price">
                                <span class="price-current">${Utils.formatCurrency(course.discountPrice || course.price)}</span>
                                ${discount > 0 ? `
                                    <span class="price-original">${Utils.formatCurrency(course.price)}</span>
                                    <span class="discount-badge">${discount}% off</span>
                                ` : ''}
                            </div>
                            <div class="purchase-buttons">
                                ${isEnrolled ? `
                                    <button class="btn btn-primary btn-block btn-lg" id="enrollBtn">
                                        Continue Learning
                                    </button>
                                ` : `
                                    <button class="btn btn-primary btn-block btn-lg" id="enrollBtn">
                                        Enroll Now
                                    </button>
                                    <button class="btn btn-outline btn-block" id="buyNowBtn">
                                        Buy Now
                                    </button>
                                `}
                            </div>
                            <p class="guarantee-text">30-day money-back guarantee</p>
                            <div class="course-includes">
                                <h4>This course includes:</h4>
                                <div class="includes-list">
                                    <div class="includes-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                        </svg>
                                        ${course.totalDuration} of video content
                                    </div>
                                    <div class="includes-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                        </svg>
                                        ${course.totalLessons} lessons
                                    </div>
                                    <div class="includes-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                            <line x1="8" y1="21" x2="16" y2="21"></line>
                                            <line x1="12" y1="17" x2="12" y2="21"></line>
                                        </svg>
                                        Access on all devices
                                    </div>
                                    <div class="includes-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="8" r="7"></circle>
                                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                                        </svg>
                                        Certificate of completion
                                    </div>
                                    <div class="includes-item">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        ${course.validity} days access
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Course Body -->
            <section class="course-body">
                <div class="container">
                    <div class="course-main">
                        <!-- Tabs -->
                        <div class="course-tabs">
                            <button class="tab-btn active" data-tab="overview">Overview</button>
                            <button class="tab-btn" data-tab="curriculum">Curriculum</button>
                            <button class="tab-btn" data-tab="instructor">Instructor</button>
                            <button class="tab-btn" data-tab="reviews">Reviews</button>
                        </div>
                        
                        <!-- Overview Tab -->
                        <div class="tab-content active" id="overviewTab">
                            <div class="course-description">
                                ${course.description}
                            </div>
                            
                            <h3 style="margin: var(--space-8) 0 var(--space-4); font-size: var(--text-xl);">What you'll learn</h3>
                            <div class="learn-grid">
                                ${(course.whatYouLearn || []).map(item => `
                                    <div class="learn-item">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>${Utils.escapeHtml(item)}</span>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <h3 style="margin: var(--space-8) 0 var(--space-4); font-size: var(--text-xl);">Requirements</h3>
                            <ul style="list-style: disc; padding-left: var(--space-6);">
                                ${(course.requirements || []).map(req => `
                                    <li style="margin-bottom: var(--space-2); color: var(--text-secondary);">${Utils.escapeHtml(req)}</li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <!-- Curriculum Tab -->
                        <div class="tab-content" id="curriculumTab">
                            <div class="curriculum-header" style="margin-bottom: var(--space-4);">
                                <span>${course.sections?.length || 0} sections • ${course.totalLessons} lectures • ${course.totalDuration} total</span>
                            </div>
                            ${(course.sections || []).map(section => `
                                <div class="curriculum-section">
                                    <button class="section-header-accordion">
                                        <div class="section-info">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                            <div>
                                                <h4>${Utils.escapeHtml(section.title)}</h4>
                                                <span class="section-meta">${section.lessons?.length || 0} lectures</span>
                                            </div>
                                        </div>
                                    </button>
                                    <div class="lessons-list">
                                        ${(section.lessons || []).map(lesson => `
                                            <div class="lesson-item">
                                                <div class="lesson-info">
                                                    ${lesson.isFree || isEnrolled ? `
                                                        <svg class="lesson-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                                        </svg>
                                                    ` : `
                                                        <svg class="lesson-icon locked" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                        </svg>
                                                    `}
                                                    <span class="lesson-title">${Utils.escapeHtml(lesson.title)}</span>
                                                </div>
                                                <div class="lesson-meta">
                                                    ${lesson.isFree ? '<span class="preview-badge">Preview</span>' : ''}
                                                    <span class="lesson-duration">${lesson.duration}</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Instructor Tab -->
                        <div class="tab-content" id="instructorTab">
                            <div class="instructor-section">
                                <div class="instructor-avatar-large">${Utils.getInitials(course.instructor)}</div>
                                <div class="instructor-details">
                                    <h3>${Utils.escapeHtml(course.instructor)}</h3>
                                    <p class="role">Course Instructor</p>
                                    <p class="bio">${Utils.escapeHtml(course.instructorBio || 'Expert instructor with years of industry experience.')}</p>
                                    <div class="instructor-stats-row">
                                        <span>⭐ ${course.rating} Rating</span>
                                        <span>👥 ${course.enrolledCount.toLocaleString()} Students</span>
                                        <span>🎓 5 Courses</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Reviews Tab -->
                        <div class="tab-content" id="reviewsTab">
                            <div class="reviews-summary">
                                <div class="rating-big">
                                    <div class="rating-number">${course.rating}</div>
                                    <div class="rating-stars">${'⭐'.repeat(Math.round(course.rating))}</div>
                                    <div class="rating-count">${course.reviewCount} reviews</div>
                                </div>
                                <div class="rating-breakdown">
                                    <div class="breakdown-row">
                                        <span class="breakdown-label">5 stars</span>
                                        <div class="breakdown-bar"><div class="breakdown-fill" style="width: 70%"></div></div>
                                        <span class="breakdown-percent">70%</span>
                                    </div>
                                    <div class="breakdown-row">
                                        <span class="breakdown-label">4 stars</span>
                                        <div class="breakdown-bar"><div class="breakdown-fill" style="width: 20%"></div></div>
                                        <span class="breakdown-percent">20%</span>
                                    </div>
                                    <div class="breakdown-row">
                                        <span class="breakdown-label">3 stars</span>
                                        <div class="breakdown-bar"><div class="breakdown-fill" style="width: 7%"></div></div>
                                        <span class="breakdown-percent">7%</span>
                                    </div>
                                    <div class="breakdown-row">
                                        <span class="breakdown-label">2 stars</span>
                                        <div class="breakdown-bar"><div class="breakdown-fill" style="width: 2%"></div></div>
                                        <span class="breakdown-percent">2%</span>
                                    </div>
                                    <div class="breakdown-row">
                                        <span class="breakdown-label">1 star</span>
                                        <div class="breakdown-bar"><div class="breakdown-fill" style="width: 1%"></div></div>
                                        <span class="breakdown-percent">1%</span>
                                    </div>
                                </div>
                            </div>
                            <div class="reviews-list" id="reviewsList">
                                <!-- Reviews loaded dynamically -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },
    
    // Video Player Page
    videoPlayerPage(course, lesson, section) {
        const user = Auth.getUser();
        
        return `
            <header class="player-header">
                <a href="#/my-courses" class="back-btn" data-link>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                    Back
                </a>
                <h1 class="player-title">${Utils.escapeHtml(course.title)}</h1>
            </header>
            
            <div class="player-layout">
                <div class="player-main">
                    <div class="video-container" id="videoContainer">
                        <div class="video-wrapper" id="videoWrapper">
                            <!-- Video loaded dynamically -->
                        </div>
                        <div class="video-watermark" id="videoWatermark">${Utils.escapeHtml(user?.email || '')}</div>
                        <div class="security-overlay hidden" id="securityOverlay">
                            <div class="security-message">
                                <h3>⚠️ Screen Recording Detected</h3>
                                <p>Video playback has been paused for security reasons.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="lesson-details">
                        <h2 class="lesson-title-large">${Utils.escapeHtml(lesson.title)}</h2>
                        <p class="lesson-description">${section.title} • Lesson duration: ${lesson.duration}</p>
                        
                        <div class="lesson-navigation">
                            <button class="btn btn-outline" id="prevLessonBtn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                                </svg>
                                Previous
                            </button>
                            <button class="btn btn-primary" id="markCompleteBtn">
                                Mark as Complete
                            </button>
                            <button class="btn btn-outline" id="nextLessonBtn">
                                Next
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <aside class="lessons-sidebar">
                    <div class="sidebar-header-player">
                        <h3>Course Content</h3>
                        <div class="course-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 25%"></div>
                            </div>
                            <span>25%</span>
                        </div>
                    </div>
                    <div class="lessons-list-player">
                        ${(course.sections || []).map(sec => `
                            <div class="section-title-player">${Utils.escapeHtml(sec.title)}</div>
                            ${(sec.lessons || []).map(les => `
                                <div class="lesson-item-player ${les.id === lesson.id ? 'active' : ''}" data-lesson-id="${les.id}">
                                    <div class="lesson-status">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    </div>
                                    <span class="lesson-title-sm">${Utils.escapeHtml(les.title)}</span>
                                    <span class="lesson-duration-sm">${les.duration}</span>
                                </div>
                            `).join('')}
                        `).join('')}
                    </div>
                </aside>
            </div>
        `;
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEO PLAYER
// ═══════════════════════════════════════════════════════════════════════════════

const VideoPlayer = {
    currentCourse: null,
    currentLesson: null,
    player: null,
    tokenExpiry: null,
    
    async init(course, lesson) {
        this.currentCourse = course;
        this.currentLesson = lesson;
        
        // Get video token
        const tokenResult = await API.getVideoToken(lesson.id, course.id);
        
        if (!tokenResult.success) {
            Toast.error('Error', 'Failed to load video');
            return;
        }
        
        this.tokenExpiry = tokenResult.data.expiresAt;
        
        // Load YouTube iframe
        const wrapper = document.getElementById('videoWrapper');
        if (wrapper) {
            // In demo mode, use a placeholder
            const youtubeId = tokenResult.data.youtubeId || 'dQw4w9WgXcQ';
            wrapper.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&rel=0&modestbranding=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            `;
        }
        
        // Initialize security features
        this.initSecurity();
        
        // Setup navigation
        this.setupNavigation();
    },
    
    initSecurity() {
        // Disable right-click
        document.addEventListener('contextmenu', (e) => {
            const container = document.getElementById('videoContainer');
            if (container?.contains(e.target)) {
                e.preventDefault();
            }
        });
        
        // Detect DevTools
        const detectDevTools = () => {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                document.getElementById('securityOverlay')?.classList.remove('hidden');
            } else {
                document.getElementById('securityOverlay')?.classList.add('hidden');
            }
        };
        
        window.addEventListener('resize', detectDevTools);
        setInterval(detectDevTools, 1000);
        
        // Disable keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
            }
        });
        
        // Token refresh
        setInterval(() => {
            if (this.tokenExpiry && Date.now() > this.tokenExpiry) {
                // Token expired, refresh
                this.init(this.currentCourse, this.currentLesson);
            }
        }, 60000);
    },
    
    setupNavigation() {
        // Mark complete button
        document.getElementById('markCompleteBtn')?.addEventListener('click', () => {
            Toast.success('Lesson Completed', 'Great job! Keep going!');
        });
        
        // Next/Previous buttons
        document.getElementById('nextLessonBtn')?.addEventListener('click', () => {
            const nextLesson = this.getAdjacentLesson(1);
            if (nextLesson) {
                Router.navigate(`/learn/${this.currentCourse.id}/${nextLesson.id}`);
            } else {
                Toast.info('Course Complete', 'You\'ve reached the end of this course!');
            }
        });
        
        document.getElementById('prevLessonBtn')?.addEventListener('click', () => {
            const prevLesson = this.getAdjacentLesson(-1);
            if (prevLesson) {
                Router.navigate(`/learn/${this.currentCourse.id}/${prevLesson.id}`);
            }
        });
    },
    
    getAdjacentLesson(offset) {
        const allLessons = [];
        for (const section of this.currentCourse.sections || []) {
            for (const lesson of section.lessons || []) {
                allLessons.push(lesson);
            }
        }
        
        const currentIndex = allLessons.findIndex(l => l.id === this.currentLesson.id);
        const newIndex = currentIndex + offset;
        
        if (newIndex >= 0 && newIndex < allLessons.length) {
            return allLessons[newIndex];
        }
        return null;
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// WISHLIST
// ═══════════════════════════════════════════════════════════════════════════════

const Wishlist = {
    getItems() {
        return Storage.get(CONFIG.STORAGE_KEYS.WISHLIST) || [];
    },
    
    add(courseId) {
        const items = this.getItems();
        if (!items.includes(courseId)) {
            items.push(courseId);
            Storage.set(CONFIG.STORAGE_KEYS.WISHLIST, items);
            Toast.success('Added to Wishlist', 'Course added to your wishlist');
        }
    },
    
    remove(courseId) {
        let items = this.getItems();
        items = items.filter(id => id !== courseId);
        Storage.set(CONFIG.STORAGE_KEYS.WISHLIST, items);
        Toast.success('Removed from Wishlist', 'Course removed from your wishlist');
    },
    
    toggle(courseId) {
        if (this.getItems().includes(courseId)) {
            this.remove(courseId);
        } else {
            this.add(courseId);
        }
    },
    
    isInWishlist(courseId) {
        return this.getItems().includes(courseId);
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const UI = {
    // Initialize theme
    initTheme() {
        const savedTheme = Storage.get(CONFIG.STORAGE_KEYS.THEME);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
    },
    
    // Toggle theme
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        Storage.set(CONFIG.STORAGE_KEYS.THEME, newTheme);
    },
    
    // Initialize password toggles
    initPasswordToggles() {
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.target;
                const input = document.getElementById(targetId);
                
                if (input) {
                    const isPassword = input.type === 'password';
                    input.type = isPassword ? 'text' : 'password';
                    
                    btn.querySelector('.eye-open').classList.toggle('hidden', !isPassword);
                    btn.querySelector('.eye-closed').classList.toggle('hidden', isPassword);
                }
            });
        });
    },
    
    // Initialize tabs
    initTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update buttons
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update content
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                document.getElementById(`${tabId}Tab`)?.classList.add('active');
            });
        });
    },
    
    // Initialize accordions
    initAccordions() {
        document.querySelectorAll('.faq-question, .section-header-accordion').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item, .curriculum-section');
                item?.classList.toggle('active');
                item?.classList.toggle('open');
            });
        });
    },
    
    // Initialize testimonials slider
    initTestimonialsSlider() {
        const track = document.querySelector('.testimonials-track');
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        const dotsContainer = document.getElementById('testimonialDots');
        
        if (!track || cards.length === 0) return;
        
        let currentIndex = 0;
        const totalSlides = cards.length;
        
        // Create dots
        if (dotsContainer) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        const updateSlider = () => {
            const cardWidth = cards[0].offsetWidth + 24; // Including gap
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update dots
            document.querySelectorAll('.slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        };
        
        const goToSlide = (index) => {
            currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
            updateSlider();
        };
        
        prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
        
        // Auto-play
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    },
    
    // Initialize stats counter animation
    initStatsCounter() {
        const counters = document.querySelectorAll('[data-count]');
        
        const animateCounter = (element) => {
            const target = parseInt(element.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target.toLocaleString() + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    },
    
    // Initialize scroll animations
    initScrollAnimations() {
        const elements = document.querySelectorAll('.reveal, .stagger');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    },
    
    // Show confetti
    showConfetti() {
        const colors = ['#6366f1', '#22d3ee', '#a855f7', '#ec4899', '#f97316'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════════════════════════════

const Search = {
    modal: null,
    input: null,
    results: null,
    
    init() {
        this.modal = document.getElementById('searchModal');
        this.input = document.getElementById('searchInput');
        this.results = document.getElementById('searchResults');
        
        // Toggle button
        document.getElementById('searchToggle')?.addEventListener('click', () => this.open());
        
        // Keyboard shortcut (Cmd/Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            if (e.key === 'Escape' && this.modal?.classList.contains('show')) {
                this.close();
            }
        });
        
        // Close on overlay click
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Search input
        this.input?.addEventListener('input', Utils.debounce((e) => {
            this.search(e.target.value);
        }, 300));
    },
    
    open() {
        this.modal?.classList.add('show');
        this.input?.focus();
    },
    
    close() {
        this.modal?.classList.remove('show');
        if (this.input) this.input.value = '';
        if (this.results) this.results.innerHTML = '<div class="search-empty"><p>Start typing to search...</p></div>';
    },
    
    toggle() {
        if (this.modal?.classList.contains('show')) {
            this.close();
        } else {
            this.open();
        }
    },
    
    async search(query) {
        if (!query.trim()) {
            this.results.innerHTML = '<div class="search-empty"><p>Start typing to search...</p></div>';
            return;
        }
        
        const result = await API.searchCourses(query);
        
        if (result.success && result.data.length > 0) {
            this.results.innerHTML = result.data.map(course => `
                <div class="search-result-item" onclick="Search.close(); Router.navigate('/course/${course.slug}')">
                    <div style="width: 60px; height: 40px; background: var(--gradient-primary); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">📚</div>
                    <div class="search-result-info">
                        <h4>${Utils.escapeHtml(course.title)}</h4>
                        <span>${Utils.escapeHtml(course.instructor)} • ${course.category}</span>
                    </div>
                </div>
            `).join('');
        } else {
            this.results.innerHTML = '<div class="search-empty"><p>No courses found</p></div>';
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    UI.initTheme();
    
    // Initialize router
    Router.init();
    
    // Initialize auth UI
    Auth.updateUI();
    
    // Initialize search
    Search.init();
    
    // Initialize modal
    Modal.init();
    
    // Initialize toast
    Toast.init();
    
    // Theme toggle
    document.getElementById('themeToggle')?.addEventListener('click', () => UI.toggleTheme());
    
    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu?.classList.toggle('show');
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', Utils.throttle(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.classList.toggle('show', window.scrollY > 500);
        }
    }, 100));
    
    // Back to top button
    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', () => Auth.logout());
    
    // Hide page loader
    setTimeout(() => {
        document.getElementById('pageLoader')?.classList.add('hidden');
    }, 500);
    
    console.log('🎓 LearnVerse Academy initialized!');
    console.log('Demo Mode:', CONFIG.DEMO_MODE);
});

// ═══════════════════════════════════════════════════════════════════════════════
// EXPOSE GLOBAL FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

window.Router = Router;
window.Auth = Auth;
window.Toast = Toast;
window.Modal = Modal;
window.Wishlist = Wishlist;
window.Search = Search;

