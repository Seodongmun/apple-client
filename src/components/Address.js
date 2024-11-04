import { useEffect, useState } from "react";

const DaumAddress = ({ addr, setAddr }) => {
  useEffect(() => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        console.log(data);
        setAddr({
          address: data.address,
          zonecode: data.zonecode,
          jibunAddress: data.jibunAddress,
        });
      },
    }).open();
  }, [setAddr]);

  console.log(addr);
};

export default DaumAddress;
