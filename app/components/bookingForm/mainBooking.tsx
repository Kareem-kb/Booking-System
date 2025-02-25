// app/(client)/booking/page.tsx
'use client';
import InputField from '@/app/components/inputs/inputfield';
import { useActionState } from 'react';
import BranchServiceStaff from '@/app/components/inputs/bookingSetup';
import SubmitButton from '@/app/components/buttons/SubmitButton';
import { createAppointAction } from '@/app/actions/appointmentActions';
import { useSession } from 'next-auth/react';

export default function BookingForm() {
  const { data: session } = useSession();
  const [stats, formAction, isPending] = useActionState(
    createAppointAction,
    null
  );
  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Book Your Appointment
      </h1>
      <form
        action={formAction} // Use onSubmit instead of action
        className="space-y-6 rounded-lg bg-white p-8 shadow-md"
      >
        {/* Personal Information */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input type="hidden" name="userId" value={session?.user?.id || ''} />
          <InputField
            name="name"
            label="name"
            autoComplete="name"
            errorHandling={stats?.errors?.name?.join(',')}
          />

          <InputField
            name="email"
            label="email"
            autoComplete="email"
            defaultValue={session?.user?.email}
            readOnly={!!session?.user?.email}
            errorHandling={stats?.errors?.email?.join(',')}
          />
          <InputField
            name="phone"
            autoComplete="tel"
            label="phone Number"
            errorHandling={stats?.errors?.phone?.join(',')}
          />
          <InputField
            name="age"
            label="Age"
            errorHandling={stats?.errors?.age?.join(',')}
          />
        </div>
        {/* Gender Selection */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Gender
            <div className="flex gap-4">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={gender.toUpperCase()}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </label>
          {stats?.errors?.gender && (
            <p className="text-sm text-red-500">
              {stats.errors.gender.join(',')}
            </p>
          )}
        </div>
        <div>
          {' '}
          <label className="block text-sm font-medium text-gray-900">
            Reason of visit <textarea name="reason" rows={4} dir="rtl" />
          </label>{' '}
          {stats?.errors?.reason && (
            <p className="text-sm text-red-500">
              {' '}
              {stats.errors.reason.join(',')}{' '}
            </p>
          )}
        </div>

        {/* Service and Staff Selection */}
        <BranchServiceStaff
          nameBranch="branchId"
          branchError={stats?.errors?.branchId?.join(',') || ''}
          serviceError={stats?.errors?.serviceId?.join(',') || ''}
          staffError={stats?.errors?.staffId?.join(',') || ''}
          nameServices="serviceId"
          nameStaff="staffId"
        />
        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="appointmentDate"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Appointment Date
              <input
                id="appointmentDate"
                type="date"
                name="date"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring-primary"
                aria-required="true"
              />
            </label>
            {stats?.errors?.date && (
              <p className="text-sm text-red-500">
                {' '}
                {stats.errors.date.join(',')}{' '}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="appointmentTime"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Appointment Time
              <input
                id="appointmentTime"
                type="time"
                name="time"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:ring-primary"
                aria-required="true"
              />
            </label>
            {stats?.errors?.time && (
              <p className="text-sm text-red-500">
                {' '}
                {stats.errors.time.join(',')}{' '}
              </p>
            )}
          </div>
          <input type="hidden" name="appointmentDate" />
        </div>
        {/* Submit Button */}
        <SubmitButton text="Book" isPending={isPending} />
      </form>
    </div>
  );
}
