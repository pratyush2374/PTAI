import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEdit, FaSave } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface PersonalDetailsProps {
    fullName: string;
    dob: string;
    age: number;
    height: number;
    additionalInfo: string;
}

const PersonalDetails = (props: PersonalDetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(props);
    const { toast } = useToast();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getInputDate = (dateString: string) => {
        return new Date(dateString).toISOString().split("T")[0];
    };

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };

    const handleSave = async () => {
        try {
            const updatedData = {
                ...formData,
                age: calculateAge(formData.dob),
            };
            await axios.post("/api/edit-personal-details", updatedData);
            setFormData(updatedData);
            setIsEditing(false);
            toast({
                title: "Success",
                description: "Personal details updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update details",
                variant: "destructive",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "dob" && { age: calculateAge(value) }),
        }));
    };

    const renderField = (key: string, value: string | number) => {
        if (key === "dob" && !isEditing) {
            return formatDate(value as string);
        }
        return value;
    };

    return (
        <Card className="md:p-6 mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-xl font-semibold">Personal Details</h3>
                <Button
                    variant="ghost"
                    onClick={() =>
                        isEditing ? handleSave() : setIsEditing(true)
                    }
                >
                    {isEditing ? (
                        <FaSave className="h-4 w-4" />
                    ) : (
                        <FaEdit className="h-4 w-4" />
                    )}
                </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                        <label className="text-sm font-medium capitalize text-gray-700">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        {isEditing ? (
                            <Input
                                name={key}
                                value={
                                    key === "dob"
                                        ? getInputDate(value as string)
                                        : value
                                }
                                onChange={handleChange}
                                className="w-full"
                                type={key === "dob" ? "date" : "text"}
                                disabled={key === "age"}
                            />
                        ) : (
                            <p className="text-gray-900">
                                {renderField(key, value)}
                            </p>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default PersonalDetails;
