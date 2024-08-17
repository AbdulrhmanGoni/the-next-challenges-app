"use client"
import PageMessage from '../PageMessage'
import { BookmarkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function UserCannotHaveBookmarksMessage() {

  const router = useRouter();

  return (
    <PageMessage
      message="انت لا تمتلك قائمة محفوظات"
      descreption="قم بتسجيل الدخول لتستطيع حفظ المنشورات عن طريق ايقونة الإشارة المرجعية والرجوع اليها في اي وقت"
      Icon={BookmarkIcon}
      action={() => { router.push("/") }}
      actionMessage="عد لإستكشاف المنشورات"
    />
  )
}
