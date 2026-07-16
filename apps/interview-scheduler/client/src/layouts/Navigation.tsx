
import { Link } from 'react-router-dom';
import { Calendar, PlusCircle } from 'lucide-react';

export const Navigation = () => {
    return (
        <div className="flex">
            <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-900">
                    Interview Scheduler
                </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                    to="/"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    Dashboard
                </Link>
                <Link
                    to="/schedule"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Schedule Interview
                </Link>
            </div>
        </div>
    );
};
