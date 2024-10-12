import ProfileCard from '@/components/ProfileCard';
import YourStats from '@/components/YourStats';

const Profile = () => {
  return (
    <main className="mx-auto flex flex-col gap-[54px] items-center justify-start py-[2em] min-h-[100vh] max-w-[600px]">
      <section className="flex flex-col gap-1 items-center justify-center">
        <h1>Your Profile</h1>
      </section>
      <ProfileCard />
      <YourStats />
    </main>
  );
};

export default Profile;
