
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";

const CloudinaryDemo = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'drsnqcita' 
    }
  });

  const myImage = cld.image('docs/models'); 
  myImage.resize(fill().width(250).height(250));

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Cloudinary Image</h2>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default CloudinaryDemo;
