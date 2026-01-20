
        document.addEventListener('DOMContentLoaded', function() {
            
           
            const reveals = document.querySelectorAll('.reveal');

            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target); 
                    }
                });
            }, {
                root: null,
                threshold: 0.1, 
                rootMargin: "0px 0px -50px 0px"
            });

            reveals.forEach(reveal => {
                revealObserver.observe(reveal);
            });

            
            const slider = document.getElementById('baSlider');
            const afterImage = document.getElementById('baAfter');
            const handle = document.getElementById('baHandle');
            let active = false;

            function getX(e) {
                if (e.changedTouches) {
                    return e.changedTouches[0].pageX;
                }
                return e.pageX;
            }

            function updateSlider(e) {
                if(e.type === 'touchmove') {
                    e.preventDefault(); 
                }

                let currentX = getX(e);
                let rect = slider.getBoundingClientRect();
                let xVal = currentX - rect.left;
                
                if (xVal < 0) xVal = 0;
                if (xVal > rect.width) xVal = rect.width;
                
                const percentage = (xVal / rect.width) * 100;
                afterImage.style.width = percentage + "%";
                handle.style.left = percentage + "%";
            }

            handle.addEventListener('mousedown', (e) => { active = true; });
            window.addEventListener('mouseup', () => { active = false; });
            slider.addEventListener('mousemove', (e) => { if (!active) return; updateSlider(e); });
            slider.addEventListener('click', (e) => { updateSlider(e); });

            handle.addEventListener('touchstart', (e) => { active = true; }, { passive: false });
            window.addEventListener('touchend', () => { active = false; });
            slider.addEventListener('touchmove', (e) => { 
                if (!active) return; 
                updateSlider(e); 
            }, { passive: false });
        });
   