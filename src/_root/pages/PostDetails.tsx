import { Loader } from "@/components/shared/Loader";
import { PostStats } from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import {
  useDeletePost,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending, isSuccess } = useGetPostById(id || "");
  const { user, isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const { mutate: onDelete, isPending: isLoadingDelete } = useDeletePost();

  const handleDeletePost = () => {
    try {
      if (!isAuthenticated) return toast.warning("Unauthorized");
      if (!id || !post) return;

      onDelete({ postId: id, imageId: post?.imageId });

      if (isLoadingDelete) toast.loading("Deleting post...");
      if (isSuccess) toast.success("Post deleted successfully");

      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!post)
    return (
      <div className="pt-32 mx-auto">
        {isPending ? <Loader /> : "No post found..."}
      </div>
    );

  return (
    <div className="post_details-container">
      <div className="post_details-card md:p-7 p-3">
        <img src={post.imageUrl} alt="post" className="post_details-img" />

        <div className="post-details_info">
          <div className="flex-between w-full mb-5">
            <Link
              to={`/profile/${post?.creator.$id}`}
              className="flex items-center gap-3"
            >
              <img
                src={
                  post.creator.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
              />

              <div className="flex flex-col">
                <p className="base-medium lg:body-bold text-light-1">
                  {post.creator.name}
                </p>
                <div className="flex-center gap-2 text-light-3">
                  <p className="subtle-semibold lg:small-regular">
                    {formatDistance(new Date(post.$createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                  •
                  <p className="subtle-semibold lg:small-regular">
                    {post.location}
                  </p>
                </div>
              </div>
            </Link>

            <div className="flex-center">
              <Link
                to={`/update-post/${post.$id}`}
                className={cn({ hidden: user.id !== post.creator.$id })}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                />
              </Link>

              <Button
                onClick={handleDeletePost}
                variant={"ghost"}
                className={cn("ghost_details-delete_btn", {
                  hidden: user.id !== post.creator.$id,
                })}
              >
                <img
                  src="/assets/icons/delete.svg"
                  alt="delete"
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>

          <hr className="border w-full border-dark-4/80 mb-5" />
          <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
            <p>{post.caption}</p>
            <ul className="gap-1 mt-2 flex">
              {post.tags?.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
