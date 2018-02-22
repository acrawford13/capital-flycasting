(function ($, document) {
    let selectedImage = null;

    $(document).ready(function(){
        if ($('.photo--clickable').length !== 0 && $('.gallery__modal').length === 0){
            $('body').append(`
            <div class="gallery__modal modal">
                <div class="modal__inner modal__inner--image">
                    <span class="modal__close">&ensp;&times;&ensp;</span>
                    <img class="modal__image" />
                    <span class="modal__footer caption">
                        <span class="modal__caption"></span>
                    </span>
                </div>
            </div>`);
        }

        $('.photo--clickable').each(function(){
            if(!$(this).attr('data-src')){
                $(this).attr('data-src', $(this).find('img').attr('src'));
            }
        });
    });

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
            if(caption || element.attr('data-index')){
                $('.gallery__modal .modal__footer').show();
            } else {
                $('.gallery__modal .modal__footer').hide();
            }
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

    $(document).on('click', '.photo--clickable', (e) => {
        showModal($(e.currentTarget));
    });

    $(document).on('click', '.modal__image', (e) => {
        if($(e.currentTarget).siblings('.modal__arrows').find('.modal__arrow--next').length) {
            e.stopPropagation();
            nextGalleryImage();
        } else {
            closeGalleryImage();
        }
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
})(jQuery, document);

(function($, document){
    $(document).on('click', '.js-link', (e) => {
        location.href = $(e.currentTarget).attr('data-link');
    });
})(jQuery, document);
