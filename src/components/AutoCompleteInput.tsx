import { Loader } from "@googlemaps/js-api-loader";
import { InputHTMLAttributes, useEffect, useRef } from "react";

const apiKey = process.env.REACT_APP_KEY_API
  ? process.env.REACT_APP_KEY_API
  : "";

const extractAddress = (place: any) => {
  const address = {
    formatted_address: "",
    lat: 0,
    lng: 0,
  };

  if (place.formatted_address) {
    address.formatted_address = place.formatted_address;
  }

  if (place.geometry && place.geometry.location) {
    address.lat = place.geometry.location.lat();
    address.lng = place.geometry.location.lng();
  }

  return address;
};

interface AddressSelected {
  formatted_address: string;
  lat: number;
  lng: number;
}

interface AutoCompleteInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onAddressSelected: (address: AddressSelected) => void;
}

function AutoCompleteInput(props: AutoCompleteInputProps) {
  const searchInput = useRef(null);
  const { onAddressSelected, ...othersProps } = props;

  // do something on address change
  const onChangeAddress = (autocomplete: any) => {
    const place = autocomplete.getPlace();
    const extractedAddress = extractAddress(place);
    props.onAddressSelected && props.onAddressSelected(extractedAddress);
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["formatted_address", "geometry"]);
    autocomplete.setComponentRestrictions({ country: "br" });
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  // load map script after mounted
  useEffect(() => {
    const init = async () => {
      try {
        if (
          !window.google ||
          !window.google.maps ||
          !window.google.maps.places
        ) {
          await new Loader({
            apiKey,
            version: "weekly",
            libraries: ["places"],
            language: "pt-BR",
          }).load();
        }
        initAutocomplete();
      } catch (error) {
        console.log(error);
      }
    };

    if (apiKey) init();
  }, []);

  return (
    <input
      ref={searchInput}
      type="text"
      {...othersProps}
      style={{
        textIndent: "0.5rem",
        width: "100%",
        height: "2.5rem",
        borderRadius: "0.25rem",
      }}
    />
  );
}

export default AutoCompleteInput;
