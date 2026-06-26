import { formatRelativeDate } from '../../lib/clubUtils';
import type { Post } from '../../types/club';
import { ClubAvatarLink } from './ClubAvatar';

interface PostCardProps {
  post: Post;
  clubId: string;
  clubName: string;
  clubLogo?: string;
  showClubHeader?: boolean;
}

export function PostCard({
  post,
  clubId,
  clubName,
  clubLogo,
  showClubHeader = true,
}: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      {showClubHeader && (
        <div className="flex items-center gap-2.5 border-b border-neutral-100 px-4 py-3">
          <ClubAvatarLink
            clubId={clubId}
            name={clubName}
            id={clubId}
            logo={clubLogo}
            size="sm"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">{clubName}</p>
            <p className="text-xs text-neutral-400">{formatRelativeDate(post.createdAt)}</p>
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900">{post.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt=""
            className="mt-3 w-full rounded-xl object-cover"
          />
        )}
      </div>
    </article>
  );
}
