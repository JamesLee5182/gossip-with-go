import { Stack } from '@mui/material';
import CreateTopicForm from '../components/CreateTopicForm';
import TopicList from '../components/TopicList'

export default function HomePage() {
    return (
        <Stack>
            <CreateTopicForm/>
        
            <TopicList/>
        </Stack>
    );
}