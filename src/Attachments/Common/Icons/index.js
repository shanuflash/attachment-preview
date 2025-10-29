import CSVIcon from './CSVIcon';
import DOCIcon from './DOCIcon';
import FILEIcon from './FILEIcon';
import HTMLIcon from './HTMLIcon';
import AudioIcon from './AudioIcon';
import VideoIcon from './VideoIcon';
import MiniAudioIcon from './MiniAudioIcon';
import MiniImageIcon from './MiniImageIcon';
import MiniOtherIcon from './MiniOtherIcon';
import MiniVideoIcon from './MiniVideoIcon';
import PDFIcon from './PDFIcon';
import XLSIcon from './XLSIcon';

const AttachmentIcons = {
  CSV: (props) => <CSVIcon {...props} />,
  XLS: (props) => <XLSIcon {...props} />,
  DOC: (props) => <DOCIcon {...props} />,
  PDF: (props) => <PDFIcon {...props} />,
  HTML: (props) => <HTMLIcon {...props} />,
  AUDIO: (props) => <AudioIcon {...props} />,
  VIDEO: (props) => <VideoIcon {...props} />,
  FILE: (props) => <FILEIcon {...props} />,
};

const MiniAttachmentIcons = {
  audios: MiniAudioIcon,
  videos: MiniVideoIcon,
  others: MiniOtherIcon,
  images: MiniImageIcon,
};

export { AttachmentIcons, MiniAttachmentIcons };
