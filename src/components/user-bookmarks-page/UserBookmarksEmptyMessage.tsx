"use client"
import PageMessage from '../PageMessage'
import { BookmarkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function UserBookmarksEmptyMessage() {

  const router = useRouter();

  return (
    <PageMessage
      message="قائمة محفوظاتك فارغة"
      descreption="لا توجد اي منشورات في قائمة المحفوظات الخاصة بك, يمكنك اضافة اي منشور الى قائمة المحفوظات بالضغط على أيقونة الاشارة المرجعية على المنشور"
      Icon={BookmarkIcon}
      action={() => { router.push("/") }}
      actionMessage="إذهب لإستكشاف المنشورات"
    />
  )
}
