import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent width="contain" maxW={900} maxH={678} >
        <ModalBody p="0" bg="pGray.800" >
          <Image
            src={imgUrl}
            width="contain"
            height="contain"
            maxHeight="600"
            maxWidth="900"
          />
        </ModalBody>

        <ModalFooter justifyContent="flex-start" bg="pGray.800">
          <Link href={imgUrl}>Abrir original</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
