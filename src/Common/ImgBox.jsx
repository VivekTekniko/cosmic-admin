import { RxAvatar } from "react-icons/rx";
const ImgBox = (props) => {
  const { circle, url, size, ratio } = props;
  return (
    <>
      <div
        style={{
          width: size ?? "50px",
          aspectRatio: ratio ?? "1/1",
          borderRadius: circle ?? "0",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          src={url ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"}
          alt=""
          className="img-fluid"
        />
      </div>
    </>
  );
};

export default ImgBox;
