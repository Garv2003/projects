import { Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMainLayout } from '@/hooks/useMainLayout';
import { LoadingSpinner } from '@/components/custom';
import { Navigation } from "@/layouts/Navigation";

const MainLayout = () => {
    const { isLoading, handleLogout } = useMainLayout();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <Navigation />
                        <div className="flex items-center">
                            <Button onClick={handleLogout}>
                                <LogOut className="h-6 w-6" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;

