import { Link } from "react-router-dom";

const PopTag = ({ name, tagCnt }) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start gap-2.5">
        {/* DOTO: Tag 컴포넌트 */}
        <div className="inline-flex items-center justify-start gap-2 text-xl font-semibold">
          <Link to={`search/${name}`}>{`# ${name}`}</Link>
        </div>
        <div className="inline-flex items-center justify-start gap-2">
          {`${tagCnt.toLocaleString()} posted`}
        </div>
      </div>
    </>
  );
};

export default PopTag;
