import React, { useState, useEffect } from "react";

 function AddressSelector () {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    fetch("https://provinces.open-api.vn/api/?depth=2")
      .then((response) => response.json())
      .then((data) => setProvinces(data));
  }, []);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div>
      <h2>Chọn địa chỉ</h2>
      <div>
        <label>Tỉnh/Thành phố:</label>
        <select onChange={handleProvinceChange}>
          <option value="">Chọn tỉnh/thành phố</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProvince && (
        <div>
          <label>Quận/Huyện:</label>
          <select onChange={handleDistrictChange}>
            <option value="">Chọn quận/huyện</option>
            {provinces
              .find((province) => province.code === parseInt(selectedProvince))
              .districts.map((district) => (
                <option key={district.code} value={district.code}>
                  {district.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedDistrict && (
        <div>
          <label>Xã/Phường:</label>
          <select>
            <option value="">Chọn xã/phường</option>
            {/* Thêm mã nguồn để hiển thị danh sách xã/phường */}
          </select>
        </div>
      )}
    </div>
  );
}


export default AddressSelector;