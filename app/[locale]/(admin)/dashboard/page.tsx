import AddItems from '@/app/components/partner/addItems';
import OrderProgress from '@/app/components/partner/orderProgress';

export default function admin() {
  return (
    <div>
      <AddItems />
      <OrderProgress />
      <h1>admin page</h1>
    </div>
  );
}
