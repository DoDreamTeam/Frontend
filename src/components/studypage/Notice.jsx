import NoticeComment from "./NoticeComment";
import NoticeForm from "./NoticeForm";


const Notice = ({ noticeData, studyId, userRole, noticeId }) => {
    return (
        <div className="p-6 max-w-lg mx-auto">
            <NoticeForm noticeData={noticeData} studyId={studyId} userRole={userRole} />
            <NoticeComment noticeId={noticeId} />
        </div>
    );
};
 
export default Notice;