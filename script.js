// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.post-card, .highlight-item, .gallery-item, .location-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('메시지가 성공적으로 전송되었습니다!');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Image lazy loading and optimization
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // opacity=0을 제거하고, 이미 로드된 경우 바로 opacity=1
            if (img.complete && img.naturalWidth !== 0) {
                img.style.opacity = '1';
            } else {
                img.onload = () => {
                    img.style.opacity = '1';
                };
                img.onerror = () => {
                    // Fallback image if loading fails
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                    img.style.opacity = '1';
                };
            }
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    // opacity=0을 제거
    imageObserver.observe(img);
    // 이미 로드된 경우 바로 opacity=1
    if (img.complete && img.naturalWidth !== 0) {
        img.style.opacity = '1';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item img');
galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <span class="close-lightbox">&times;</span>
            </div>
        `;
        
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            width: 100%;
            height: auto;
            border-radius: 10px;
        `;
        
        const closeBtn = lightbox.querySelector('.close-lightbox');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        `;
        
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
        
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    });
});

// Google Maps functionality
const locationItems = document.querySelectorAll('.location-item');
locationItems.forEach(item => {
    item.addEventListener('click', () => {
        const lat = item.getAttribute('data-lat');
        const lng = item.getAttribute('data-lng');
        const locationName = item.querySelector('h4').textContent;
        
        // Open Google Maps in new tab
        const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&t=m`;
        window.open(mapsUrl, '_blank');
        
        // Add visual feedback
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'translateX(5px)';
        }, 150);
    });
});

// Update map iframe with better URL
function updateMapIframe() {
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe) {
        // Better Google Maps embed URL for Sapporo
        const newUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.5!2d141.3545!3d43.0618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b297b4b5b5b5b%3A0x5f0b297b4b5b5b5b!2sSapporo%2C%20Hokkaido%2C%20Japan!5e0!3m2!1sen!2sjp!4v1234567890';
        mapIframe.src = newUrl;
    }
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Update map after page loads
    updateMapIframe();
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
    
    /* Image loading animation */
    .gallery-item img,
    .post-image img {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .gallery-item img:hover,
    .post-image img:hover {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// 랜덤 구글 여행기 링크 연결
const travelLinks = [
    'https://blog.naver.com/PostView.naver?blogId=travelholic&logNo=222123456789',
    'https://brunch.co.kr/@japantrip/123',
    'https://m.blog.naver.com/abcd1234/223456789012',
    'https://www.tripadvisor.co.kr/Attraction_Review-g298560-d324904-Reviews-Sapporo_TV_Tower-Sapporo_Hokkaido.html',
    'https://www.lonelyplanet.com/japan/hokkaido/sapporo',
    'https://www.japan-guide.com/e/e2163.html',
    'https://www.trippose.com/tour/sapporo',
    'https://www.klook.com/ko/blog/sapporo-travel-guide/'
];

document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const randomUrl = travelLinks[Math.floor(Math.random() * travelLinks.length)];
        window.open(randomUrl, '_blank');
    });
});

// Comment System with Real Database
class CommentSystem {
    constructor() {
        this.comments = [];
        this.commentForm = document.getElementById('commentForm');
        this.commentsList = document.getElementById('commentsList');
        this.apiBaseUrl = 'http://localhost:3000/api';
        this.isLoading = false;
        
        this.init();
    }
    
    async init() {
        await this.loadComments();
        this.setupEventListeners();
        this.setupAutoRefresh();
    }
    
    setupEventListeners() {
        if (this.commentForm) {
            this.commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addComment();
            });
        }
    }
    
    // 자동 새로고침 설정 (30초마다)
    setupAutoRefresh() {
        setInterval(() => {
            if (!this.isLoading) {
                this.loadComments();
            }
        }, 30000);
    }
    
    async loadComments() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        try {
            const response = await fetch(`${this.apiBaseUrl}/comments`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const comments = await response.json();
            this.comments = comments;
            this.renderComments();
            
            console.log('댓글 로드 완료:', comments.length + '개');
        } catch (error) {
            console.error('Error loading comments:', error);
            this.showNotification('댓글을 불러오는데 실패했습니다. 서버 연결을 확인해주세요.', 'error');
            
            // 오프라인 상태일 때 로컬 스토리지에서 불러오기
            this.loadFromLocalStorage();
        } finally {
            this.isLoading = false;
        }
    }
    
    // 로컬 스토리지에서 댓글 불러오기 (오프라인 대비)
    loadFromLocalStorage() {
        const savedComments = localStorage.getItem('sapporoComments');
        if (savedComments) {
            try {
                this.comments = JSON.parse(savedComments);
                this.renderComments();
                this.showNotification('오프라인 모드: 저장된 댓글을 불러왔습니다.', 'warning');
            } catch (error) {
                console.error('Error parsing saved comments:', error);
            }
        }
    }
    
    // 로컬 스토리지에 댓글 저장
    saveToLocalStorage() {
        try {
            localStorage.setItem('sapporoComments', JSON.stringify(this.comments));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }
    
    async addComment() {
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');
        
        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        
        if (!name || !text) {
            this.showNotification('이름과 댓글 내용을 모두 입력해주세요.', 'error');
            return;
        }
        
        // 입력 중복 방지
        const submitBtn = this.commentForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '작성 중...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, text })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const newComment = await response.json();
            this.comments.unshift(newComment);
            this.renderComments();
            this.saveToLocalStorage();
            
            // 폼 초기화
            this.commentForm.reset();
            
            // 성공 메시지
            this.showNotification('댓글이 성공적으로 작성되었습니다!', 'success');
            
            // 댓글 목록으로 스크롤
            this.scrollToComments();
        } catch (error) {
            console.error('Error adding comment:', error);
            this.showNotification('댓글 작성에 실패했습니다. 네트워크 연결을 확인해주세요.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
    
    async addReply(parentId, name, text) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/comments/${parentId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, text })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const newReply = await response.json();
            
            // Find parent comment and add reply
            const parentComment = this.comments.find(c => c.id === parentId);
            if (parentComment) {
                if (!parentComment.replies) {
                    parentComment.replies = [];
                }
                parentComment.replies.push(newReply);
                this.renderComments();
                this.saveToLocalStorage();
                this.showNotification('답글이 성공적으로 작성되었습니다!', 'success');
            }
        } catch (error) {
            console.error('Error adding reply:', error);
            this.showNotification('답글 작성에 실패했습니다. 네트워크 연결을 확인해주세요.', 'error');
        }
    }
    
    async deleteComment(commentId) {
        if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
            return;
        }
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/comments/${commentId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.comments = this.comments.filter(c => c.id !== commentId);
            this.renderComments();
            this.saveToLocalStorage();
            this.showNotification('댓글이 삭제되었습니다.', 'success');
        } catch (error) {
            console.error('Error deleting comment:', error);
            this.showNotification('댓글 삭제에 실패했습니다. 네트워크 연결을 확인해주세요.', 'error');
        }
    }
    
    renderComments() {
        if (!this.commentsList) return;
        
        if (this.comments.length === 0) {
            this.commentsList.innerHTML = `
                <div class="no-comments">
                    <i class="fas fa-comments" style="font-size: 2rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <p>아직 댓글이 없습니다.</p>
                    <p>첫 번째 댓글을 작성해보세요!</p>
                </div>
            `;
            return;
        }
        
        this.commentsList.innerHTML = this.comments.map(comment => this.renderComment(comment)).join('');
        
        // 이벤트 리스너 다시 설정
        this.setupCommentEventListeners();
    }
    
    renderComment(comment) {
        const repliesHtml = comment.replies && comment.replies.length > 0 
            ? `<div class="comment-replies">${comment.replies.map(reply => this.renderReply(reply)).join('')}</div>`
            : '';
        
        return `
            <div class="comment-item" data-id="${comment.id}">
                <div class="comment-header">
                    <span class="comment-author">
                        <i class="fas fa-user-circle"></i>
                        ${this.escapeHtml(comment.name)}
                    </span>
                    <span class="comment-date">
                        <i class="fas fa-clock"></i>
                        ${comment.date}
                    </span>
                </div>
                <div class="comment-content">${this.escapeHtml(comment.text)}</div>
                <div class="comment-actions">
                    <button class="comment-action-btn reply-btn" data-id="${comment.id}">
                        <i class="fas fa-reply"></i> 답글
                    </button>
                    <button class="comment-action-btn delete-btn" data-id="${comment.id}">
                        <i class="fas fa-trash"></i> 삭제
                    </button>
                </div>
                <div class="comment-reply-form" id="reply-form-${comment.id}">
                    <div class="reply-form-group">
                        <input type="text" placeholder="이름" class="reply-name-input">
                    </div>
                    <div class="reply-form-group">
                        <textarea placeholder="답글을 입력하세요..." rows="3" class="reply-text-input"></textarea>
                    </div>
                    <button class="reply-submit-btn" data-id="${comment.id}">
                        <i class="fas fa-paper-plane"></i> 답글 작성
                    </button>
                </div>
                ${repliesHtml}
            </div>
        `;
    }
    
    renderReply(reply) {
        return `
            <div class="comment-item reply-item" style="margin-left: 2rem; margin-top: 1rem; border-left-color: #3498db;">
                <div class="comment-header">
                    <span class="comment-author">
                        <i class="fas fa-user-circle"></i>
                        ${this.escapeHtml(reply.name)}
                    </span>
                    <span class="comment-date">
                        <i class="fas fa-clock"></i>
                        ${reply.date}
                    </span>
                </div>
                <div class="comment-content">${this.escapeHtml(reply.text)}</div>
            </div>
        `;
    }
    
    setupCommentEventListeners() {
        // 답글 버튼
        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.reply-btn').dataset.id);
                const replyForm = document.getElementById(`reply-form-${commentId}`);
                replyForm.classList.toggle('active');
                
                // 다른 열린 답글 폼들 닫기
                document.querySelectorAll('.comment-reply-form.active').forEach(form => {
                    if (form.id !== `reply-form-${commentId}`) {
                        form.classList.remove('active');
                    }
                });
            });
        });
        
        // 삭제 버튼
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.delete-btn').dataset.id);
                this.deleteComment(commentId);
            });
        });
        
        // 답글 작성 버튼
        document.querySelectorAll('.reply-submit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const commentId = parseInt(e.target.closest('.reply-submit-btn').dataset.id);
                const replyForm = document.getElementById(`reply-form-${commentId}`);
                const nameInput = replyForm.querySelector('.reply-name-input');
                const textInput = replyForm.querySelector('.reply-text-input');
                
                const name = nameInput.value.trim();
                const text = textInput.value.trim();
                
                if (!name || !text) {
                    this.showNotification('이름과 답글 내용을 모두 입력해주세요.', 'error');
                    return;
                }
                
                this.addReply(commentId, name, text);
                
                // 폼 초기화 및 숨기기
                replyForm.reset();
                replyForm.classList.remove('active');
            });
        });
    }
    
    scrollToComments() {
        if (this.commentsList) {
            this.commentsList.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        let backgroundColor, icon;
        
        switch(type) {
            case 'success':
                backgroundColor = '#27ae60';
                icon = 'fas fa-check-circle';
                break;
            case 'error':
                backgroundColor = '#e74c3c';
                icon = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                backgroundColor = '#f39c12';
                icon = 'fas fa-exclamation-triangle';
                break;
            default:
                backgroundColor = '#3498db';
                icon = 'fas fa-info-circle';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${backgroundColor};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `
            <i class="${icon}" style="font-size: 1.2rem;"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// 페이지 로드 시 댓글 시스템 초기화
document.addEventListener('DOMContentLoaded', () => {
    new CommentSystem();
});

// 알림 애니메이션 CSS 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Map System
class MapSystem {
    constructor() {
        this.locationItems = document.querySelectorAll('.location-item');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Location select buttons
        document.querySelectorAll('.location-select-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleLocationSelect(btn);
            });
        });
    }
    
    handleLocationSelect(btn) {
        const locationItem = btn.closest('.location-item');
        const locationName = locationItem.dataset.name;
        
        // Toggle selected state
        const allSelectBtns = document.querySelectorAll('.location-select-btn');
        allSelectBtns.forEach(b => {
            b.classList.remove('selected');
            b.textContent = '선택';
        });
        
        if (!btn.classList.contains('selected')) {
            btn.classList.add('selected');
            btn.textContent = '선택됨';
            
            // Show notification
            this.showLocationNotification(`${locationName}이(가) 선택되었습니다!`);
        } else {
            btn.classList.remove('selected');
            btn.textContent = '선택';
        }
    }
    
    showLocationNotification(locationName) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #e74c3c;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInDown 0.3s ease-out;
            font-weight: 500;
        `;
        notification.textContent = locationName;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
}

// Enhanced map functionality
function enhanceMapSection() {
    // Add map animations
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        mapSection.style.opacity = '0';
        mapSection.style.transform = 'translateY(30px)';
        mapSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(mapSection);
    }
    
    // Add location item animations
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
}

// Initialize map system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing systems
    new CommentSystem();
    
    // Initialize map system
    new MapSystem();
    
    // Enhance map section
    enhanceMapSection();
    
    // Add map notification animations
    const style = document.createElement('style');
    style.textContent += `
        @keyframes slideInDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutUp {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// 지도 섹션 관련 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const locationItems = document.querySelectorAll('.location-item');
    
    locationItems.forEach(item => {
        // 호버 효과
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // 클릭 시 Google Maps 링크 열기
        item.addEventListener('click', function(e) {
            // 링크 버튼이 아닌 다른 부분을 클릭했을 때만
            if (!e.target.closest('.location-map-link')) {
                const googleUrl = this.getAttribute('data-google-url');
                if (googleUrl) {
                    window.open(googleUrl, '_blank');
                }
            }
        });
    });
}); 