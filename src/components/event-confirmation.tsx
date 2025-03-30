import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Event } from "@/lib/types";

import { Calendar } from "lucide-react";

export function EventConfirmation({
    item,
    onClose,
}: {
    item: Event;
    onClose?: (didConfirm: boolean) => void;
}) {
    return (
        <AlertDialog
            open
            onOpenChange={(open) => {
                if (!open) onClose?.call(null, false);
            }}
        >
            <AlertDialogContent className="text-start">
                <AlertDialogHeader>
                    <AlertDialogTitle className="">
                        Czy potwierdzasz udział w wydarzeniu?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <h1 className="text-lg font-bold grow text-start">
                            {item.data.title}
                        </h1>
                        <div className="pl-1 text-sm font-light text-start">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} strokeWidth={1.8} />{" "}
                                {item.data.date.toLocaleDateString("pl-PL")}
                            </div>
                            {"brief" in item.data && (
                                <div> {item.data.brief}</div>
                            )}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className="cursor-pointer"
                        onClick={() => onClose?.call(null, true)}
                    >
                        Wypisz się
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="cursor-pointer"
                        onClick={() => onClose?.call(null, true)}
                    >
                        Potwierdź
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
