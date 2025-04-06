import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

function PageTransition({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Define routes and direction tracking
    const routes = ['/', '/cart', '/order', '/account'];
    const currentIndex = routes.indexOf(location.pathname);
    const prevIndexRef = React.useRef(currentIndex);

    // Determine direction of navigation
    const direction = currentIndex >= prevIndexRef.current ? 1 : -1;

    // Update the previous index after direction is determined
    React.useEffect(() => {
        prevIndexRef.current = currentIndex;
    }, [currentIndex]);

    // Swipe navigation handler
    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 300;

        if (swipe) {
            const swipeDirection = offset.x > 0 ? -1 : 1;
            const nextIndex = Math.max(0, Math.min(routes.length - 1, currentIndex + swipeDirection));

            if (currentIndex !== nextIndex) {
                navigate(routes[nextIndex]);
            }
        }
    };

    return (
        <div className="overflow-hidden h-full">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: direction > 0 ? '100%' : '-100%' }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? '-100%' : '100%' }}
                    transition={{
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        opacity: { duration: 0.15 }
                    }}
                    className="w-full h-full min-h-[calc(100vh-5rem)] pb-24"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default PageTransition;