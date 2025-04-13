'use client';

import { useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { createUser } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

export default function SignUpForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    createUser,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <Button className="w-full" aria-disabled={isPending}>
        Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>

      {errorMessage && (
        <div className="flex items-center text-sm text-red-500">
          <ExclamationCircleIcon className="h-5 w-5 mr-1" />
          {errorMessage}
        </div>
      )}
    </form>
  );
}
