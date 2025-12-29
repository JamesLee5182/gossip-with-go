import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type DeleteButtonProps = {
    item_id: string | undefined
    deleteFn: (id: string) => void
    navigateAfterDelete?: string
    queryKey?: string[]
}

export default function DeleteButton({ item_id, deleteFn, navigateAfterDelete, queryKey }: DeleteButtonProps) {
    if (!item_id) return

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    
    const handleDelete = async () => {
        if (confirm("Confirm Delete?")) {
            deleteMutation.mutate();
        }
    }

    const deleteMutation = useMutation({
        mutationFn: async () => deleteFn(item_id),

        onSuccess: () => {
            if (navigateAfterDelete) navigate(navigateAfterDelete)

            if (queryKey) queryClient.invalidateQueries({ queryKey: queryKey })
            
            alert("Successfully Deleted")
        },
    })

    return (
        <Button 
            color="warning" 
            variant="contained" 
            onClick={handleDelete} 
            sx={{ mb: 2 , maxWidth: 100}}
            disabled={deleteMutation.isPending} 
        >
            <DeleteIcon/>Delete
        </Button>
    )
}