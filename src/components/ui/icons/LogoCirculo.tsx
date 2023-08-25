import { ComponentProps, memo } from "react";

function LogoCirculo({ ...props }: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="20 20 169.88 169.88"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <path id="a" d="M0 0h169.877v169.877H0z"></path>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(20 20)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a"></use>
        </mask>
        <path
          fill="currentColor"
          d="M147.5 116.95c.667 0 1.066-.373 1.066-.913 0-.604-.334-.86-1.08-.86h-.628v1.772h.642zm-1.618-2.595h1.644c1.399 0 2.028.553 2.028 1.657 0 .808-.488 1.257-1.002 1.463l1.49 2.492h-1.104l-1.284-2.222h-.796v2.222h-.976v-5.612zm5.74 2.8c0-2.222-1.657-4.032-3.981-4.032-2.323 0-3.993 1.681-3.993 4.031 0 2.222 1.67 4.031 3.993 4.031 2.196 0 3.98-1.68 3.98-4.03zm-8.692 0c0-2.735 1.977-4.713 4.71-4.713 2.608 0 4.713 1.978 4.713 4.712 0 2.735-1.977 4.712-4.712 4.712-2.734 0-4.711-1.977-4.711-4.712zm-55.086-.318c0-5.703 5.08-10.918 11.134-16.97l6.707-6.708c4.45-4.45 13.795-13.8 9.898-22.617-.256-.58.167-.868.56-.388 5.895 7.208 3.889 18.426-7.701 30.016l-9.486 9.467c-5.988 5.987-8.884 8.896-10.38 16.156-.112.543-.732.541-.732 0v-8.956zM66.052 93.874c-6.818 6.817-8.464 14.718-3.043 19.414.454.393.218.875-.375.604-6.761-3.082-12.091-14.276-.5-25.867l23.203-23.182c5.988-5.988 8.885-8.84 10.38-16.099.113-.543.733-.54.733 0v8.895c0 5.703-5.082 10.918-11.134 16.97L66.052 93.874zm-12.274 9.185c-5.895-7.208-3.89-18.424 7.7-30.015L85.363 49.18c5.988-5.987 8.884-8.896 10.38-16.156.112-.543.732-.54.732 0v8.956c0 5.703-5.082 10.918-11.134 16.971L64.236 80.055c-4.45 4.45-13.796 13.8-9.898 22.618.256.58-.167.867-.56.386zm-4.042-15.714c-2.13-6.878-.738-17.423 9.23-27.392l26.367-26.379c5.988-5.987 8.892-8.852 10.388-16.11.112-.544.732-.542.732 0v8.894c0 5.703-5.082 10.918-11.135 16.971l-22.74 22.733c-10.548 10.55-12.21 15.515-12.161 21.294.005.613-.5.573-.681-.01zm54.133-8.004c6.818-6.819 8.464-14.718 3.043-19.415-.454-.393-.218-.874.375-.604 6.76 3.081 12.09 14.275.5 25.867l-8.806 8.785c-5.988 5.988-8.885 8.84-10.381 16.1-.112.542-.732.54-.732 0v-8.896c0-5.703 5.082-10.917 11.134-16.97l4.867-4.867zm16.316 6.528c2.128 6.878.738 17.423-9.23 27.392l-11.971 11.982-.974.976h-8.24c2.018-3.466 5.432-6.933 9.23-10.73l8.343-8.337c10.548-10.549 12.21-15.515 12.16-21.294-.004-.612.5-.574.682.011zm-31.588 55.485c-.112.543-.732.541-.732 0v-8.883c0-.2.163-.364.364-.364l4.4-.002c-1.956 2.587-3.208 5.252-4.032 9.25zm19.539-.246c-11.452-1.93-17.695 3.52-19.564 8.624-.165.451-.701.383-.701-.048l-.006-1.588c0-5.703 5.082-10.918 11.135-16.97l9.999-10.007 26.64 4.582s7.61 7.61 14.118 14.123c12.548-14.804 20.12-33.959 20.12-54.886C169.877 38.028 131.849 0 84.939 0 38.029 0-.001 38.028-.001 84.938c0 20.927 7.574 40.082 20.122 54.886 6.507-6.514 14.117-14.123 14.117-14.123l30.24-5.197c14.005-2.438 17.5.713 17.523 5.35a.365.365 0 01-.363.364l-8.733-.003c-.2 0-.363.163-.363.364v5.162c0 .201.163.364.363.364h8.74c.2 0 .363.162.363.364l-.001 17.215c0 .431-.536.5-.701.048-1.87-5.105-8.112-10.555-19.564-8.624 0 0-19.914 3.442-34.686 5.985 15.17 14.132 35.514 22.784 57.883 22.784s42.713-8.652 57.883-22.784a64012.07 64012.07 0 01-34.686-5.985z"
          mask="url(#b)"
        ></path>
      </g>
    </svg>
  );
}

export default memo(LogoCirculo);