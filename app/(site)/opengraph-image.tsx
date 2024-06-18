import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "The Arts Folk"
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					background: "white",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<svg
					width='900'
					height='141'
					viewBox='0 0 900 141'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M220.388 138.57C219.643 138.604 219.202 138.638 218.768 138.638C208.927 138.638 199.086 138.627 189.239 138.66C188.268 138.66 187.698 138.345 187.15 137.557C179.816 127.026 172.442 116.523 165.114 105.993C164.515 105.137 163.905 104.742 162.816 104.765C159.434 104.844 156.046 104.793 152.658 104.793H151.027V138.548H124.332V32.052C124.75 32.0182 125.14 31.9619 125.529 31.9619C140.474 31.9619 155.419 31.9394 170.359 31.9619C176.202 31.9732 181.978 32.5307 187.596 34.2821C194.766 36.5177 200.87 40.3133 205.392 46.3953C208.763 50.9285 210.745 56.0531 211.687 61.5832C212.591 66.8542 212.709 72.1477 211.699 77.4188C209.689 87.9045 203.659 95.2816 194.072 99.8712C193.468 100.158 192.852 100.434 192.101 100.778C201.513 113.353 210.863 125.843 220.388 138.57ZM151.123 55.8504C150.863 58.1255 150.959 82.5997 151.236 83.6584C151.478 83.6696 151.744 83.6922 152.009 83.6922C158.604 83.6922 165.193 83.6753 171.787 83.6922C178.161 83.7091 185.196 79.4742 185.721 70.723C185.964 66.6627 184.897 62.9516 181.995 59.9444C179.178 57.0274 175.649 55.7659 171.629 55.7659C165.215 55.7659 158.807 55.7659 152.393 55.7659C151.998 55.7659 151.603 55.811 151.128 55.8391L151.123 55.8504Z'
						fill='black'
					/>
					<path
						d='M601.792 140.569C587.005 140.378 573.675 135.614 562.683 125.1C553.824 116.625 548.488 106.246 546.653 94.1497C544.389 79.2151 547.399 65.39 556.235 53.0628C564.963 40.8877 576.933 33.595 591.697 31.0271C604.13 28.8646 616.212 30.2161 627.572 35.8476C643.624 43.8048 653.645 56.6444 657.219 74.1412C660.398 89.729 657.496 104.32 648.259 117.396C639.937 129.177 628.442 136.301 614.343 139.308C610.312 140.17 606.224 140.485 601.792 140.569ZM572.823 86.429C572.986 87.8031 573.128 90.1457 573.557 92.4321C574.641 98.2156 577.091 103.38 581.241 107.62C587.819 114.333 595.915 117.109 605.208 116.112C615.665 114.992 623.332 109.58 627.956 100.209C632.089 91.8352 632.467 83.022 629.526 74.2313C622.598 53.5302 598.224 48.9857 583.872 60.9581C576.239 67.3272 572.981 75.718 572.817 86.429H572.823Z'
						fill='black'
					/>
					<path
						d='M767.807 32.097H794.552C794.654 36.9513 794.586 41.7887 794.598 46.6261C794.609 51.441 794.598 56.2502 794.598 61.0651V75.5941C794.677 75.6336 794.756 75.6674 794.835 75.7068C795.134 75.352 795.445 75.0085 795.733 74.6424C806.471 60.913 817.204 47.178 827.943 33.4486C828.107 33.2346 828.299 33.0375 828.44 32.8066C828.807 32.2097 829.304 32.0013 830.021 32.0069C840.539 32.0295 851.063 32.0182 861.582 32.0238C861.847 32.0238 862.113 32.0689 862.649 32.1139C857.675 38.3198 852.768 44.3398 847.89 50.3766C842.967 56.4755 838.027 62.563 833.098 68.6562C828.197 74.71 823.302 80.7638 818.317 86.9189C834.667 104.084 850.973 121.197 867.42 138.458C866.968 138.542 866.697 138.632 866.426 138.632C855.049 138.638 843.667 138.632 832.29 138.66C831.393 138.66 830.896 138.238 830.365 137.658C818.875 125.145 807.375 112.643 795.874 100.142C795.552 99.7924 795.219 99.4488 794.626 99.1954V138.553H767.813V32.097H767.807Z'
						fill='black'
					/>
					<path
						d='M307.63 122.357C312.457 116.022 317.172 109.839 321.988 103.52C322.462 103.87 322.886 104.174 323.298 104.489C329.604 109.298 336.521 112.897 344.244 114.845C349.264 116.112 354.356 116.715 359.539 116.09C362.069 115.786 364.502 115.161 366.698 113.809C368.313 112.818 369.589 111.506 370.244 109.692C371.345 106.618 370.301 103.374 367.602 101.454C365.964 100.288 364.113 99.5277 362.176 99.0997C358.128 98.21 354.063 97.3596 349.981 96.6669C342.991 95.4731 336.035 94.2116 329.429 91.5255C324.574 89.5545 320.125 86.9584 316.494 83.1177C312.587 78.9843 310.34 74.068 309.629 68.4648C308.906 62.7602 309.301 57.1513 311.3 51.7169C313.688 45.2408 318.069 40.4428 323.992 36.9682C328.554 34.2933 333.506 32.6433 338.683 31.6916C349.331 29.7375 359.884 30.0866 370.284 33.2346C378.928 35.8532 386.539 40.2964 393.286 46.2545C393.523 46.4628 393.794 46.6261 394.149 46.8852C389.407 53.3388 384.777 59.6347 380.074 66.0433C379.622 65.7166 379.233 65.4463 378.854 65.1535C373.174 60.7779 366.913 57.5905 359.872 56.0306C355.073 54.9663 350.24 54.5552 345.379 55.6251C342.889 56.1714 340.541 57.0499 338.542 58.7055C335.358 61.3467 335.996 65.5871 338.468 67.6876C339.146 68.2677 339.903 68.8027 340.71 69.18C342.014 69.7825 343.352 70.3964 344.741 70.7174C348.693 71.6184 352.674 72.4124 356.66 73.167C362.95 74.3552 369.296 75.2675 375.422 77.1991C378.832 78.2747 382.112 79.6375 385.144 81.5522C390.937 85.207 394.776 90.3034 396.43 96.9485C398.164 103.903 398.039 110.869 395.967 117.734C393.686 125.291 388.893 130.878 382.016 134.73C377.68 137.157 373.016 138.694 368.138 139.488C356.626 141.352 345.204 140.896 333.946 137.731C325.466 135.349 318.058 130.974 311.3 125.421C310.255 124.565 309.239 123.67 308.206 122.797C308.07 122.678 307.924 122.577 307.647 122.363L307.63 122.357Z'
						fill='black'
					/>
					<path
						d='M117.969 138.559C117.32 138.598 116.931 138.638 116.535 138.638C107.553 138.638 98.5698 138.621 89.5813 138.666C88.5594 138.666 88.0795 138.3 87.656 137.422C85.7082 133.418 83.6643 129.459 81.7164 125.455C81.3043 124.604 80.8074 124.312 79.8589 124.312C65.998 124.34 52.1427 124.34 38.2817 124.312C37.3389 124.312 36.842 124.599 36.4355 125.455C34.5046 129.515 32.4833 133.536 30.5298 137.585C30.1797 138.317 29.7732 138.655 28.9094 138.655C19.7459 138.621 10.5825 138.638 1.41899 138.632C1.15363 138.632 0.888266 138.598 0.408356 138.565C0.662426 138.002 0.85439 137.529 1.08588 137.078C6.4891 126.705 11.898 116.337 17.3012 105.964C29.92 81.7493 42.5445 57.5398 55.1294 33.3134C55.6375 32.3336 56.1909 31.9337 57.2975 31.99C59.0026 32.0858 60.719 32.0126 62.4692 32.0126C80.9599 67.5018 99.411 102.918 117.981 138.548L117.969 138.559ZM70.8535 102.704C66.9183 94.3862 63.062 86.2319 59.1607 77.9762C58.0597 79.5925 47.671 101.752 47.5355 102.704H70.8535Z'
						fill='black'
					/>
					<path
						d='M480.895 74.2708H529.546V97.7989C529.546 97.7989 529.49 97.8552 529.456 97.8833C529.422 97.9115 529.382 97.934 529.343 97.9509C529.303 97.9678 529.253 97.9734 529.213 97.9791C529.123 97.9903 529.032 97.9959 528.942 97.9959C528.852 97.9959 528.761 97.9959 528.671 97.9959C512.913 97.9959 497.155 97.996 481.403 98.0016C481.312 98.0016 481.222 98.0128 481.132 98.0297C481.092 98.0354 481.053 98.0635 480.844 98.1705V138.548H453.991V32.204C454.929 31.9056 533.792 31.8042 535.57 32.0971C535.841 33.1163 535.875 54.3074 535.57 55.7715H480.895V74.2651V74.2708Z'
						fill='black'
					/>
					<path
						d='M219.202 32.052H304.045V55.6927C300.849 55.8616 297.659 55.7434 294.475 55.7659C291.313 55.7884 288.157 55.7659 284.995 55.7659H275.205C275.148 60.4174 275.188 64.9845 275.177 69.5516C275.171 74.1412 275.177 78.7252 275.177 83.3148V138.525C272.167 138.751 269.209 138.598 266.262 138.627C263.235 138.655 260.215 138.632 257.189 138.632H248.132V55.856C247.477 55.8222 246.952 55.7772 246.427 55.7772C237.896 55.7772 229.365 55.7772 220.828 55.7772C220.298 55.7772 219.772 55.7772 219.197 55.7772V32.0576L219.202 32.052Z'
						fill='black'
					/>
					<path
						d='M702.946 114.89H756.086C756.402 115.926 756.482 136.881 756.194 138.593H676.003V32.0971H702.946V114.885V114.89Z'
						fill='black'
					/>
					<path
						d='M871.496 126.04C871.287 119.193 877.255 112.289 885.56 112.311C893.154 112.328 899.387 118.494 899.399 125.995C899.41 133.66 893.324 139.781 885.538 139.736C876.578 139.685 871.282 132.595 871.496 126.04Z'
						fill='black'
					/>
					<path
						d='M415.531 13.7274C415.971 13.3163 416.417 12.9052 416.858 12.4885C417.992 11.4297 419.263 10.5907 420.719 10.0557C420.928 9.97684 421.154 9.93742 421.374 9.88674C424.468 9.14902 426.004 10.6526 425.089 13.6654C424.57 15.3774 423.819 17.0218 423.136 18.683C422.537 20.1359 421.877 21.5663 421.267 23.0192C421.081 23.4585 420.725 23.9597 421.199 24.3876C421.713 24.8494 422.283 24.5059 422.673 24.1849C423.605 23.419 424.48 22.58 425.327 21.724C425.75 21.296 426.089 21.0876 426.625 21.7916C425.129 23.8696 423.441 25.6998 420.702 26.1672C420.268 26.2404 419.793 26.2179 419.359 26.1334C418.105 25.8856 417.496 25.0296 417.738 23.7795C417.863 23.1262 418.128 22.4899 418.393 21.876C419.472 19.3532 420.59 16.8528 421.662 14.3243C421.939 13.6654 422.176 12.9728 422.289 12.2745C422.413 11.5142 421.928 11.0243 421.171 11.1651C420.522 11.2833 419.833 11.5086 419.302 11.8859C416.587 13.8118 414.204 16.0306 413.109 19.325C412.527 21.0707 411.844 22.7827 411.195 24.5115C411.025 24.9677 410.816 25.4126 410.596 25.9307H407.412C410.517 17.9735 413.6 10.0557 416.75 1.96896H413.442C413.244 1.34387 413.363 1.01162 413.967 0.949675C416.022 0.741312 418.077 0.538581 420.307 0.313324C420.16 0.865203 420.064 1.41708 419.867 1.92954C418.568 5.28024 417.247 8.6253 415.937 11.976C415.728 12.511 415.542 13.0516 415.344 13.5922C415.407 13.6373 415.469 13.6823 415.525 13.7274H415.531Z'
						fill='black'
					/>
					<path
						d='M440.949 22.0787C439.187 25.6153 435.608 26.7979 432.802 26.4206C430.278 26.0827 428.573 24.1793 428.545 21.6339C428.533 20.7891 428.596 19.905 428.844 19.111C430.086 15.1239 432.655 12.235 436.404 10.3992C437.511 9.85856 438.713 9.62767 439.955 9.7572C441.977 9.97119 443.089 11.4016 442.807 13.412C442.592 14.9663 441.751 16.0531 440.334 16.712C438.527 17.5511 436.613 17.7369 434.648 17.6468C434.112 17.6243 433.57 17.5849 432.954 17.5455C432.085 19.1222 431.548 20.7723 431.639 22.5518C431.757 24.8438 433.457 25.9532 435.715 25.2436C437.121 24.8044 438.307 23.9991 439.21 22.8108C439.43 22.5236 439.611 22.2083 439.842 21.9323C440.243 21.448 440.266 21.4593 440.949 22.0787ZM433.457 16.2728C434.688 16.7007 435.817 16.7064 436.901 16.391C438.578 15.9067 439.735 14.8086 440.091 13.0685C440.407 11.5367 439.154 10.4949 437.714 11.0918C437.11 11.3396 436.54 11.7676 436.071 12.2294C434.942 13.3444 434.14 14.6847 433.457 16.2728Z'
						fill='black'
					/>
					<path
						d='M401.613 11.3396H398.875C398.706 10.6639 398.773 10.2697 399.49 10.2753C400.303 10.2753 401.111 10.2753 402.048 10.2753C402.483 9.21659 402.918 8.14662 403.318 7.16676C404.363 6.99218 405.289 6.8345 406.373 6.6543C406.35 7.89884 405.492 8.94065 405.306 10.2809H408.964C408.908 11.4523 408.891 11.4861 407.937 11.503C406.909 11.5198 405.882 11.503 404.826 11.503C404.397 12.5617 404.007 13.5077 403.623 14.4651C402.601 17.0105 401.585 19.5503 400.574 22.1013C400.394 22.5574 400.224 23.0361 400.157 23.5148C400.021 24.4834 400.591 24.9733 401.54 24.7199C402.539 24.4552 403.284 23.8076 403.934 23.0361C404.391 22.4899 404.831 21.9323 405.311 21.3354C405.605 21.5381 405.814 21.6846 406.012 21.8253C405.052 24.2863 402.189 26.3192 399.874 26.1784C399.349 26.1446 398.796 26.0039 398.322 25.7786C397.486 25.3788 396.967 24.6748 397.119 23.7175C397.266 22.7939 397.475 21.8648 397.814 20.9919C398.875 18.2212 400.01 15.4844 401.105 12.7306C401.269 12.3251 401.404 11.914 401.608 11.3396H401.613Z'
						fill='black'
					/>
					<path
						d='M433.457 16.2727C434.14 14.6847 434.942 13.3388 436.071 12.2294C436.54 11.7676 437.11 11.3452 437.714 11.0918C439.154 10.4949 440.407 11.5367 440.091 13.0685C439.735 14.8086 438.578 15.9011 436.901 16.391C435.817 16.7064 434.688 16.7007 433.457 16.2727Z'
						fill='white'
					/>
				</svg>
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
		}
	)
}