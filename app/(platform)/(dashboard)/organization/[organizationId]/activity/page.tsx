import { checkSubscription } from '@/lib/subscription';
import { Info } from '../_components/info';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { ActivityList } from './_components/activity-list';

const ActivityPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2" />
      <Suspense>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
