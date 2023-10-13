import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleProfileClick = () => {
    if (session?.user.id === post.creator._id) router.push('/profile');
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  return (
    <div className='prompt_card'>
      <div className='flex flex-col gap-4 justify-start items-start'>
        <div
          className='flex items-start justify-between gap-4'
          onClick={handleProfileClick}
        >
          <div className='flex justify-start items-center gap-4 cursor-pointer'>
            <Image
              src={post.creator.image}
              width={37}
              height={37}
              className='rounded-full object-contain'
            />
            <div className='flex flex-col'>
              <p className='font-satoshi font-semibold text-gray-900'>
                {post.creator.username}
              </p>
              <p className='font-inter text-gray-500 text-sm'>
                {post.creator.email}
              </p>
            </div>
          </div>
          <div className='copy_btn cursor-pointer' onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt ? '/icons/tick.svg' : '/icons/copy.svg'
              }
              alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
              width={12}
              height={12}
            />
          </div>
        </div>
        <p className='font-satoshi text-gray-700 text-sm'>{post.prompt}</p>
        <p
          className='blue_gradient text-sm font-inter cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        {session?.user.id === post.creator._id && pathname === '/profile' && (
          <div className='flex-center gap-4 mt-5 border-t border-gray-100 p-3'>
            <p
              className='green_gradient text-sm font-inter cursor-pointer'
              onClick={() => handleEdit && handleEdit(post)}
            >
              Edit
            </p>
            <p
              className='orange_gradient text-sm font-inter cursor-pointer'
              onClick={() => handleDelete && handleDelete(post)}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
