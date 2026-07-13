import { Card, CardContent } from '@/components/ui/card';
import { HomeIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Page Not Found</h1>
                        <p className="mt-2 text-base text-gray-500">
                            Sorry, we couldn't find the page you're looking for. Please check the URL or return to the dashboard.
                        </p>
                        <div className="mt-6 flex flex-col gap-3">
                            <Button asChild>
                                <Link to="/" className="flex items-center justify-center gap-2">
                                    <HomeIcon className="h-4 w-4" />
                                    Return to Dashboard
                                </Link>
                            </Button>
                            <p className="text-sm text-gray-500">
                                If you believe this is an error, please contact support.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
