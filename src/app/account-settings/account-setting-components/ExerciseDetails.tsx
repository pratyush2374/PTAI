import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FaEdit, FaSave } from "react-icons/fa";
import axios from "axios";

interface ExerciseDetailsProps {
    activityLevel: string;
    exerciseType: string[];
    experience: string;
    duration: string;
    frequency: string;
    pace: string;
    equipment: string[];
}

const ACTIVITY_LEVELS = [
    "Sedentary",
    "Light",
    "Moderate",
    "Active",
    "Very active",
];
const EXERCISE_TYPES = [
    "Cardio",
    "Strength",
    "Weightlifting",
    "HIIT",
    "Pilates",
    "Aerobics",
    "Yoga",
    "Running",
    "Cycling",
    "Swimming",
];
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const DURATIONS = ["15-30", "30-45", "45-60", "60+"];
const FREQUENCIES = ["1-2", "3-4", "5-6", "Daily"];
const PACES = ["Slow", "Moderate", "Fast"];
const EQUIPMENT = [
    "No Equipment",
    "Dumbbell",
    "Treadmills",
    "Ellipticals",
    "Rowing Machines",
    "Stair Climbers",
    "Weight Plates",
    "Leg Press Machine",
    "Chest Press Machine",
    "Lat Pulldown Machine",
    "Seated Row Machine",
    "Adjustable Bench",
    "Flat Bench",
    "Squat Rack",
    "Barbell",
    "Resistance Bands",
    "Kettlebell",
    "Exercise Ball",
    "Medicine Ball",
    "Pull-Up Bar",
    "Jump Rope",
    "Treadmill",
    "Stationary Bike",
    "Rowing Machine",
    "Elliptical Machine",
    "Bench",
    "Yoga Mat",
    "Battle Ropes",
    "Smith Machine",
    "Cable Machine",
];

const ExerciseDetails = (props: ExerciseDetailsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(props);
    const { toast } = useToast();

    const handleSave = async () => {
        try {
            await axios.post("/api/edit-exercise-details", formData);
            setIsEditing(false);
            toast({
                title: "Success",
                description: "Exercise details updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update exercise details",
                variant: "destructive",
            });
        }
    };

    const toggleArray = (array: string[], item: string) => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    return (
        <Card className="md:p-6 mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-xl font-semibold">Exercise Details</h3>
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

            <CardContent className="space-y-6">
                {isEditing ? (
                    <>
                        <div className="space-y-3">
                            <h4 className="font-medium">Activity Level</h4>
                            <RadioGroup
                                value={formData.activityLevel}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        activityLevel: value,
                                    })
                                }
                            >
                                {ACTIVITY_LEVELS.map((level) => (
                                    <div
                                        key={level}
                                        className="flex items-center space-x-2"
                                    >
                                        <RadioGroupItem
                                            value={level}
                                            id={level}
                                        />
                                        <label htmlFor={level}>{level}</label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium">Exercise Types</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {EXERCISE_TYPES.map((type) => (
                                    <div
                                        key={type}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox
                                            checked={formData.exerciseType.includes(
                                                type
                                            )}
                                            onCheckedChange={() =>
                                                setFormData({
                                                    ...formData,
                                                    exerciseType: toggleArray(
                                                        formData.exerciseType,
                                                        type
                                                    ),
                                                })
                                            }
                                        />
                                        <label>{type}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Single select fields */}
                        {[
                            {
                                title: "Experience Level",
                                options: EXPERIENCE_LEVELS,
                                field: "experience",
                            },
                            {
                                title: "Duration (minutes)",
                                options: DURATIONS,
                                field: "duration",
                            },
                            {
                                title: "Frequency (days/week)",
                                options: FREQUENCIES,
                                field: "frequency",
                            },
                            { title: "Pace", options: PACES, field: "pace" },
                        ].map(({ title, options, field }) => (
                            <div key={field} className="space-y-3">
                                <h4 className="font-medium">{title}</h4>
                                <RadioGroup
                                    value={
                                        formData[
                                            field as keyof ExerciseDetailsProps
                                        ] as string
                                    }
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            [field]: value,
                                        })
                                    }
                                >
                                    {options.map((option) => (
                                        <div
                                            key={option}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                value={option}
                                                id={option}
                                            />
                                            <label htmlFor={option}>
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        ))}

                        <div className="space-y-3">
                            <h4 className="font-medium">Available Equipment</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {EQUIPMENT.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center space-x-2"
                                    >
                                        <Checkbox
                                            checked={formData.equipment.includes(
                                                item
                                            )}
                                            onCheckedChange={() =>
                                                setFormData({
                                                    ...formData,
                                                    equipment: toggleArray(
                                                        formData.equipment,
                                                        item
                                                    ),
                                                })
                                            }
                                        />
                                        <label>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <span className="font-medium">Activity Level:</span>{" "}
                            {formData.activityLevel}
                        </div>
                        <div>
                            <span className="font-medium">Exercise Types:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {formData.exerciseType.map((type) => (
                                    <span
                                        key={type}
                                        className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="font-medium">
                                Experience Level:
                            </span>{" "}
                            {formData.experience}
                        </div>
                        <div>
                            <span className="font-medium">Duration:</span>{" "}
                            {formData.duration} minutes
                        </div>
                        <div>
                            <span className="font-medium">Frequency:</span>{" "}
                            {formData.frequency} days/week
                        </div>
                        <div>
                            <span className="font-medium">Pace:</span>{" "}
                            {formData.pace}
                        </div>
                        <div>
                            <span className="font-medium">Equipment:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {formData.equipment.map((item) => (
                                    <span
                                        key={item}
                                        className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ExerciseDetails;
