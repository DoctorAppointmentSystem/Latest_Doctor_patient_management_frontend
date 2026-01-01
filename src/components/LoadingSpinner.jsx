import React from 'react';

/**
 * Loading Spinner Component
 * A beautiful animated spinner with optional text
 */
export const Spinner = ({ size = 'md', color = 'primary' }) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    const colors = {
        primary: 'border-primary',
        white: 'border-white',
        gray: 'border-gray-500',
    };

    return (
        <div
            className={`${sizes[size]} ${colors[color]} border-t-transparent rounded-full animate-spin`}
            role="status"
            aria-label="Loading"
        />
    );
};

/**
 * Full Screen Loading Overlay
 * Shows a centered spinner with optional message
 */
export const LoadingOverlay = ({ message = 'Loading...' }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
                <Spinner size="lg" />
                <p className="text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    );
};

/**
 * Button with built-in loading state
 */
export const LoadingButton = ({
    loading,
    children,
    onClick,
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            disabled={loading || disabled}
            className={`relative flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-80 cursor-not-allowed' : ''
                } ${className}`}
            {...props}
        >
            {loading && <Spinner size="sm" color="white" />}
            <span className={loading ? 'opacity-70' : ''}>{children}</span>
        </button>
    );
};

export default { Spinner, LoadingOverlay, LoadingButton };
