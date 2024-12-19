import AddItems from '@/app/components/admin/addItems';
import OrderProgress from '@/app/components/admin/orderProgress';

export default function admin() {
  return (
    <div>
      <AddItems />
      <OrderProgress/>
      <h1>admin page</h1>
    </div>
  );
}
