"use client";

import {
  ListVideoIcon,
  LucideIcon,
  MessageSquareQuoteIcon,
  NewspaperIcon,
  ScrollTextIcon,
  YoutubeIcon,
} from "lucide-react";

export const postsResourcesTypesIcons: { [type: string]: LucideIcon } = {
  "فيديو يوتيوب": YoutubeIcon,
  "قائمة تشغيل على يوتيوب": ListVideoIcon,
  مقال: ScrollTextIcon,
  خبر: NewspaperIcon,
  "منشور على مواقع التواصل": MessageSquareQuoteIcon,
};
