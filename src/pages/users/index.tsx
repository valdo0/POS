import AuthLayout from '@/components/authLayouth';
import React from 'react'

export default function UsersPage() {
  return (
    <div>index</div>
  )
}

UsersPage.getLayout = (page: React.ReactNode) => (
  <AuthLayout>{page}</AuthLayout>
);
