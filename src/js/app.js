(function ($, document) {
    let selectedImage = null;

    function openImage(imageElement){
        imageElement.clone().addClass('photo--temp').insertAfter(imageElement.parent());
        imageElement.addClass('photo--clicked');
        imageElement.parent('.photo-container').addClass('photo-container--clicked');
    }

    function closeImage(){
        $('.photo--clicked').removeClass('photo--clicked');
        $('.photo-container--clicked').removeClass('photo-container--clicked');
        $('.photo--temp').remove();
    }

    function closeGalleryImage(){
        $('.gallery__modal').css({'display':'none'});
        removeKeyboardListener();
    }

    function showModal(element){
        setModalImage(element);
        $('.gallery__modal .modal__image').load(() => {
            $('.gallery__modal').css({'display':'flex'});
        });
        addKeyboardListener();
    }

    function setModalImage(element){
        selectedImage = element;
        const caption = element.find('.photo__caption').html();
        const imageNum = element.attr('data-index') + '/' + $('.gallery__item').length;
        $('.gallery__modal .modal__image').attr('src', element.attr('data-src'));
        $('.gallery__modal .modal__image').load(() => {
            $('.gallery__modal .modal__caption').html(caption);
            $('.gallery__modal .modal__imagenum').html(imageNum);
        });
    }

    function nextGalleryImage(){
        const nextImage = selectedImage.next('.gallery__item');
        if(nextImage.length === 1){
            selectedImage = nextImage;
        } else {
            selectedImage = selectedImage.siblings('.gallery__item').first();
        }
        setModalImage(selectedImage);
    }

    function prevGalleryImage(){
        const prevImage = selectedImage.prev('.gallery__item');
        if(prevImage.length === 1){
            selectedImage = prevImage;
        } else {
            selectedImage = selectedImage.siblings('.gallery__item').last();
        }
        setModalImage(selectedImage);
    }

    function handleKeyboardInput(event){
        switch(event.keyCode) {
        case 27:
            closeGalleryImage();
            break;
        case 39:
            nextGalleryImage();
            break;
        case 37:
            prevGalleryImage();
            break;
        default:
            break;
        }
    }

    function addKeyboardListener(){
        $(document).on('keyup', handleKeyboardInput);
    }

    function removeKeyboardListener(){
        $(document).off('keyup', handleKeyboardInput);
    }


    $(document).on('click', '.gallery__item', (e) => {
        showModal($(e.currentTarget));
    });

    $(document).on('click', '.modal__image', (e) => {
        e.stopPropagation();
        nextGalleryImage();
    });

    $(document).on('click', '.gallery__modal', () => {
        closeGalleryImage();
    });

    $(document).on('click', '.modal__caption', (e) => {
        e.stopPropagation();
    });

    $(document).on('click', '.modal__close', () => {
        closeGalleryImage();
    });

    $(document).on('click', '.modal__arrow--next', (e) => {
        e.stopPropagation();
        nextGalleryImage();
    });

    $(document).on('click', '.modal__arrow--prev', (e) => {
        e.stopPropagation();
        prevGalleryImage();
    });

    $(document).on('click', '.photo--clickable', (e) => {
        closeImage();
        openImage($(e.currentTarget));
    });

    $(document).on('click', '.photo-container--clicked', () => {
        closeImage();
    });

    $(document).on('click', '.photo--clicked', () => {
        closeImage();
    });
})(jQuery, document);

(function($, document){
    $(document).on('click', '.js-link', (e) => {
        location.href = $(e.currentTarget).attr('data-link');
    });
})(jQuery, document);
