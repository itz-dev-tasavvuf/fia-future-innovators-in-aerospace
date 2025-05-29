
import UserCard from "./UserCard";

interface User {
  id: string;
  name: string;
  location: string;
  dream: string;
  interests: string[];
  achievements?: string[];
}

interface GridViewProps {
  users: User[];
  onUserClick: (userId: string) => void;
}

const GridView = ({ users, onUserClick }: GridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <UserCard 
          key={user.id} 
          user={{
            ...user,
            achievements: user.achievements || []
          }} 
          onUserClick={onUserClick} 
        />
      ))}
    </div>
  );
};

export default GridView;
