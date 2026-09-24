import type { LegalPageContent, Locale } from "../types/site";
import { siteConfig } from "./site-config";

interface ProductLegalDocument {
  id: string;
  slugs: Record<Locale, string>;
  content: Record<Locale, LegalPageContent>;
}

interface ProductLegalProduct {
  name: string;
  documents: ProductLegalDocument[];
}

const idsnapPrivacy: ProductLegalDocument = {
  id: "privacy",
  slugs: {
    es: "privacidad",
    en: "privacy",
  },
  content: {
    es: {
      seo: {
        title: "Política de privacidad de IDSnap",
        description:
          "Cómo IDSnap accede, procesa, conserva y comparte fotografías y datos relacionados.",
      },
      eyebrow: "IDSnap · Legal",
      title: "Política de privacidad de IDSnap",
      updatedLabel: "Última actualización",
      updated: "24 de septiembre de 2026",
      intro:
        "Esta política describe cómo IDSnap, una aplicación de Quantix Software, trata la cámara, las fotografías y la información derivada necesaria para preparar fotos para documentos.",
      sections: [
        {
          title: "Responsable y alcance",
          paragraphs: [
            "IDSnap es una aplicación de Quantix Software, identificada en Android con el paquete software.quantix.idsnap. Esta política se aplica al uso de IDSnap en dispositivos Android.",
            "IDSnap no requiere crear una cuenta para usar sus funciones actuales.",
          ],
        },
        {
          title: "Datos y permisos que utiliza IDSnap",
          paragraphs: [
            "IDSnap solicita acceso a la cámara únicamente cuando eliges tomar una foto. La cámara se utiliza para mostrar la vista previa, capturar la imagen y analizar durante la captura elementos de encuadre y posición del rostro.",
            "Cuando eliges una foto existente, IDSnap utiliza el selector de fotos de Android para que selecciones una imagen concreta. La aplicación no solicita acceso amplio y permanente a toda tu biblioteca de fotos para esta función.",
            "La aplicación procesa la fotografía seleccionada o capturada y puede derivar datos geométricos como límites del rostro, posición aproximada de los ojos y ángulos de la cabeza. Estos datos se usan para evaluar encuadre y requisitos fotográficos; IDSnap no los utiliza para identificar ni autenticar a una persona.",
          ],
        },
        {
          title: "Cómo se procesan las fotografías",
          paragraphs: [
            "El análisis facial, el recorte, el cambio de tamaño, la validación de la foto y la eliminación opcional del fondo se ejecutan en el dispositivo. IDSnap utiliza bibliotecas de Google ML Kit con modelos incluidos en la aplicación para detección facial y segmentación de persona.",
            "IDSnap no carga tus fotografías en servidores de Quantix Software para realizar estas funciones. La versión actual tampoco incorpora una función de cuenta de usuario, publicidad dentro de la app ni un SDK de analítica de comportamiento de usuarios.",
          ],
        },
        {
          title: "Almacenamiento, conservación y eliminación",
          paragraphs: [
            "Para trabajar con una foto, IDSnap crea copias temporales dentro del almacenamiento privado o caché de la aplicación. Estas copias se reemplazan o eliminan durante el flujo de trabajo y también pueden ser eliminadas por Android al administrar la caché.",
            "Cuando guardas una imagen final, Android te permite elegir el destino. El archivo guardado permanece en ese destino hasta que tú lo elimines. Al desinstalar IDSnap o borrar sus datos desde Android se eliminan los datos privados locales de la aplicación, pero no los archivos que hayas guardado fuera de ella.",
            "IDSnap no mantiene en servidores de Quantix una cuenta, historial de fotografías ni copia remota de las imágenes procesadas en la versión actual.",
          ],
        },
        {
          title: "Guardar, compartir y servicios de terceros",
          paragraphs: [
            "Si eliges compartir una fotografía, IDSnap abre la hoja de compartir de Android y concede acceso temporal al archivo a la aplicación que tú selecciones. Desde ese momento, el tratamiento realizado por la aplicación receptora se rige por sus propias políticas.",
            "IDSnap integra componentes de Google ML Kit para procesamiento en el dispositivo y utiliza funciones del sistema Android para cámara, selección de fotos, guardado y uso compartido. Quantix no vende fotografías ni información facial procesada por IDSnap.",
          ],
        },
        {
          title: "Seguridad",
          paragraphs: [
            "IDSnap limita el acceso a fotografías y cámara a las funciones necesarias para preparar la foto. Las copias de trabajo se mantienen en almacenamiento privado de la aplicación y las exportaciones se realizan mediante mecanismos de Android controlados por el usuario.",
            "Ningún sistema puede garantizar seguridad absoluta. Si detectas un problema de seguridad o privacidad relacionado con IDSnap, comunícalo a nuestro contacto de privacidad.",
          ],
        },
        {
          title: "Contacto y cambios",
          paragraphs: [
            "Para preguntas, solicitudes o inquietudes de privacidad relacionadas con IDSnap, escribe a " +
              siteConfig.email +
              ".",
            "Podemos actualizar esta política cuando cambien las funciones de IDSnap, sus dependencias o los requisitos legales y de Google Play. La fecha de la versión vigente aparece al inicio de esta página.",
          ],
        },
      ],
    },
    en: {
      seo: {
        title: "IDSnap privacy policy",
        description:
          "How IDSnap accesses, processes, retains, and shares photos and related data.",
      },
      eyebrow: "IDSnap · Legal",
      title: "IDSnap privacy policy",
      updatedLabel: "Last updated",
      updated: "September 24, 2026",
      intro:
        "This policy explains how IDSnap, an application by Quantix Software, handles camera access, photos, and derived information needed to prepare document photos.",
      sections: [
        {
          title: "Controller and scope",
          paragraphs: [
            "IDSnap is an application by Quantix Software, identified on Android by the package software.quantix.idsnap. This policy applies to the use of IDSnap on Android devices.",
            "IDSnap does not require an account to use its current features.",
          ],
        },
        {
          title: "Data and permissions used by IDSnap",
          paragraphs: [
            "IDSnap requests camera access only when you choose to take a photo. The camera is used to show a preview, capture the image, and analyze framing and face positioning during capture.",
            "When you choose an existing photo, IDSnap uses the Android photo picker so you can select a specific image. The app does not request broad, persistent access to your entire photo library for this feature.",
            "The app processes the selected or captured photo and may derive geometric data such as face bounds, approximate eye positions, and head angles. This data is used to evaluate framing and photo requirements; IDSnap does not use it to identify or authenticate a person.",
          ],
        },
        {
          title: "How photos are processed",
          paragraphs: [
            "Face analysis, cropping, resizing, photo validation, and optional background removal run on the device. IDSnap uses Google ML Kit libraries with models bundled in the application for face detection and person segmentation.",
            "IDSnap does not upload your photos to Quantix Software servers to perform these functions. The current version also does not include a user-account feature, in-app advertising, or a user-behavior analytics SDK.",
          ],
        },
        {
          title: "Storage, retention, and deletion",
          paragraphs: [
            "To work with a photo, IDSnap creates temporary copies in the app's private storage or cache. These copies are replaced or removed during the workflow and may also be removed by Android when it manages cache storage.",
            "When you save a final image, Android lets you choose the destination. The saved file remains there until you delete it. Uninstalling IDSnap or clearing its app data removes IDSnap's private local data, but it does not remove files you saved outside the app.",
            "In the current version, IDSnap does not maintain a Quantix server account, photo history, or remote copy of processed images.",
          ],
        },
        {
          title: "Saving, sharing, and third-party services",
          paragraphs: [
            "If you choose to share a photo, IDSnap opens the Android share sheet and grants temporary access to the file to the app you select. From that point, the receiving app's own privacy practices apply.",
            "IDSnap integrates Google ML Kit components for on-device processing and uses Android system features for camera access, photo selection, saving, and sharing. Quantix does not sell photos or facial information processed by IDSnap.",
          ],
        },
        {
          title: "Security",
          paragraphs: [
            "IDSnap limits access to photos and camera data to the functions needed to prepare the photo. Working copies are kept in private app storage, and exports use Android mechanisms controlled by the user.",
            "No system can guarantee absolute security. If you identify a security or privacy issue related to IDSnap, contact us through the privacy contact below.",
          ],
        },
        {
          title: "Contact and changes",
          paragraphs: [
            "For privacy questions, requests, or concerns related to IDSnap, write to " +
              siteConfig.email +
              ".",
            "We may update this policy when IDSnap features, dependencies, legal requirements, or Google Play requirements change. The effective version date appears at the top of this page.",
          ],
        },
      ],
    },
  },
};

const productLegalRegistry: Record<string, ProductLegalProduct> = {
  idsnap: {
    name: "IDSnap",
    documents: [idsnapPrivacy],
  },
};

export function getProductLegalStaticPaths(locale: Locale) {
  return Object.entries(productLegalRegistry).flatMap(([product, definition]) =>
    definition.documents.map((document) => ({
      params: {
        product,
        document: document.slugs[locale],
      },
      props: {
        content: document.content[locale],
        alternatePath: buildProductLegalPath(
          product,
          document,
          locale === "es" ? "en" : "es",
        ),
      },
    })),
  );
}

function buildProductLegalPath(
  product: string,
  document: ProductLegalDocument,
  locale: Locale,
): string {
  return `/${locale}/legal/${product}/${document.slugs[locale]}/`;
}
