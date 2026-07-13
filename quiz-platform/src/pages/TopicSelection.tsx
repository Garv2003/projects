import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { TopicList } from '@/components/custom/TopicList';
import { SelectionFooter } from '@/components/custom/SelectionFooter';

const TopicSelection = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-8">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl text-center">Quiz Topic Selection</CardTitle>
                    <CardDescription className="text-center">
                        Select one or more topics for your quiz. Each topic contains unique questions.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <TopicList />
                </CardContent>

                <CardFooter>
                    <SelectionFooter />
                </CardFooter>
            </Card>
        </div>
    );
};

export default TopicSelection;
