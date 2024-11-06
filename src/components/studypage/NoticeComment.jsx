import CommentForm from "../ui/CommentForm";
import CommentList from "./comment/CommentList";

const NoticeComment = ( {noticeId} ) => {
    return ( 
        <div className="mt-4">
            <CommentForm noticeId={noticeId} />
            <CommentList noticeId={noticeId} />
        </div>
    );
}
 
export default NoticeComment;