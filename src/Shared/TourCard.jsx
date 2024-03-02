import React from 'react';
import { Card, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
// import photos from '../../../backend/photos'

import "./tour-card.css";
import { BASE_URL } from '../utils/config';

const TourCard = ({tour}) => {
    
   const {_id, title, photo, city, Price, featured, reviews } = tour;

   const { totalRating, avgRating} = calculateAvgRating(reviews)

//    console.log(photo)
  /* const totalRating = reviews?.reduce((acc,item) => acc + item.rating,0);
   const avgRating =
    totalRating === 0 
    ? '' 
    : totalRating === 1
    ? totalRating 
    : totalRating / reviews?.length;*/
 
 
    return (
    <div className='tour__card'>
        <Card>
            <div className='tour__img'>
            <img src={`${BASE_URL}/photos/${photo}`} alt={photo} />
               
                { featured && <span>Featured</span> }
            </div>
            
        <CardBody>

         <div className='card__top d-flex align-items-center
         justify-content-between'>
            <span className='tour__location d-flex align-items-center gap-1'>
                <i className="ri-map-pin-line"></i>{city}
            </span>
            <span className='tour__rating d-flex align-items-center gap-1'>
                <i className="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
                { totalRating === 0 ? ( 'Not rated' ) : (
                     <span>({reviews.length})</span>
                )} 
                
                <span>({reviews.length})</span>
            </span>
         </div>

         <h5 className='tour__title'>
            <Link to={`/tours/${_id}`}>{title}</Link></h5>

         <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>${Price} <span> /per person </span></h5>
            <button className='btn booking__btn'>
                <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
         </div>
        </CardBody> 
        </Card>


    </div>
  )
}

export default TourCard



// img url
/*  
<img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAyQMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAEMQAAIBAwICBwMKBQIEBwAAAAECAwAEERIhBTEGEyJBUWFxgZGhFBUWMlJikrHB0SNCcuHwQ1NUorLSByQ0NWNzg//EABsBAAIDAQEBAAAAAAAAAAAAAAECAAMEBQYH/8QAOxEAAgIBAgMEBwYEBwEBAAAAAAECEQMEIQUSMSJBUWETFDJxgaHBBkJSkbHRFSMz8BZTYnKC4fGSNP/aAAwDAQACEQMRAD8A71EQDNdFN2YaQCzxxtg7knnirVjlJFXPFE5mUeY7qTkHcyCWU5ODgVdGC7ymUiHWW5mrOVFbdj6tqlEsYyEUeUDlQPXHwo8gOcYyt4VORA52N1r+NHkQOdi6xvGpyoHMwS7Hvo0gNsbUaNAFmpRLHzUDYgTQDYWTQIEC2OVChrYtTeNSkS2LUe+pRLYxNGgWNvUJuMaICMrmmTFaAMdGwUD1dGwUXEkbG5rJyq7NvMwSMnNWIRsl15XFLyh5gWOaKAwcUwgSYPPlQbGSsaQDV2eVGLdbiSW+wFMKLFSwULTUsNC00LJQ4WpZKH0jwqWGh9A8KFhofR5ULDyi0+VGwUNioQVAgqJBAb0LIluSBurPIH2UrVj3QTkPgkAelBJoZ0yJ1zyp0ytoEptTcwHEArRsDQOmiAdSaSiywqhGPg91QCHKsBk8qioZ2NRFsJc43BFKwoIxPjONqnOiOLA0mmsShAVA0PilJQsUQhD0oEFnyoEH37qgQ9LEUtoflYAGo4JxTN0JytsWMct6NitME58Klk3Fue6oQJfOgxkNJtg9xqR6BYBYimoWxxIM0Gg2OZV8KiiycyIyQeVMhWNRBQoueaWRZHzJCAeXOgiMYZBqMi2EJDnnR5QcwUS5fflSydIMVbJpJURd8DHfVfRWyy7dIFLqNlxlif6aqeSF9S1Y510BUq+67ir4yTWxncWnTHxRsFDYHl76NgofA8KlhofAqWShYFAmw5IB2FBKxrSJA2V3FLW492gHIG/fRSFk6ADbU1CWNgtyqdCdRjlaZbgaYJapQLGLeNGgWMzCikS0DmmAPmlII4qBGqEIIbuCW5kt45A0sYyy+ANVxyRk6Q1NblrNOSxudRAscLUslBM8cUeSapyZFH2i6EHLoVnkaY9wHdWHJlc35G3HjUF5ksY045jP3edUssLAXK9kYPpTRyODtCyhGS3Kt08sYw4ARv5h+tWy1MpKuhXHTxTsa3UHJyCPKqbZdSLXJCU3x3Vfj1LjtIoyYFJ7Gej3kl0FLtGp7hjFCWom3aDHBBLdFmOdo3KudY8TzFGGod1IE8Cq4gG813BSJOyObHb4VbLUpbRK46Zv2iwjsw3xj1oQ1MW6kgy08ktmInNbVVGNt3Q2alAscPQ5RlIReoogcgM5pqFsBqZCsCmFEKAR6hBiaJLGzUJZyHEeIRw3IfhKSPM27OV3xnevPZM8Iy5sWy/U6MYOUakjpuHcQa4tA80T9YNpNK7A+Fb8OtjKPa6lb00r2NJkKQda/YzyRuZ9lN67jbpDep5ErZFDOkiqQCNXcaaWqXL2eoI6Z3uPddVAuuaRgue5c71inKUu02aoqMNkim3ELRcrpm27ylV2w88Rn49w+J0RuuBKBtkOwJNC2xk7Jb3jtjZdUZmn0zIGUqmcgnA5cqlS8Apq6GHSDhV0xSG5ZmTnGYmz57YodrwGVMVpe2dxIPkFwJoi6qerUkIT40HLaw8vcXrq8sLG4ME99AkgOCpODQU0w+jYPy3h80Zlju4HRdiyuMD2+2nvxEojxGwMiSJ1ajVqLbEVLVhpgCW3BDx3EBJ7g4OfKonYKZbtpY50cgoojOG7QxmgyDS40lkZCBzIYVow6iUHXVFGXTxnv3gnBUN3HYedb8eeE+jME8M4PdA8+Rq60V0xqIoJokBIJogBIoiiFQiHqBGqEFUIc1atbz3w1mO3XB0yzpjHfnAPMmvPeghFXVs7OK2+odhxe7tbm7tyge0IJhkhypc+eDTxxx70B5Gt4kCXt40tq0y8Sfq8hlyT1meWTjai8VXysb0rk0maMNxMDM3ye+3bCEuR7gazabFmUf5srY2RLG+VOzW4Xw+94jNmaOUxLnQWRhkHxztnnWiklb6gk+bZdDZ+j0iqzrECdOME94HlS8yF9F3lNuh087LLNNAsmgLgqzAAe2lfKy5NokPQlm3ea3PL/Tf/ALqFJjKTXQj+iCWPWzCW3UlCutpSoXPrmmUb2EeRxqzkV/8AI8RjtYb+3uI+sUyNbOGVSOQJ8aplCWPZmiOSOTeJtcZtJJLi7ZE6xp1IiYEHPZA/OstSUlZpU1yNI4eWC94bNPZXiNBJsXTYjkCM428K2S2ZnhT3JDxLiAt2t/lcxt9IGjV2cdwFD3jcq7jSWykPAvlOhCUQuW2zkHY+tU9pSZdWNxSfUNpZYopoYxgOVLhVHa9aKlJiuEVsQm11WVxIETsahk4XBxTc0nJJMXkjFOzTt7q5ithHHIxRtx4ZxVKnOLuJe8WKSqRUmv7kFBbzqZA/aRSGYNzG3vrTjz5U+plyafE+4XzxxGCdRcM5xgmN4wpPwrbh1GaWSMZPZsx59NgjilKPVInPSeQc7Pf+o/tXf9BH8R5b1x+HzEOk7k/+j+P9qPoF4kesru+ZPFxszWEt4EgVY2I0NPh2x4DFYJ6zBDL6Nt++tjq4tFqMmH0qS917lb6TjAJtefLt/wBq3xwqSTTOY9RJNpx3QP0pHdaH8f8Aam9X8yesvw+Y30rUc7Q/jqeg8yesPwG+li/8Ifx0PQeYfTvwMyCaYxrqgtOslxgNLj1ri+hla8zY+Iwpy5XS+paS6LRW5CxKGUAgzaSGyeW3LFN6vLvZVLikFaUXsaXD7ssEDAZP1Yw+o5z3Uz0y5OaxY8Xk8vJKGxOOOabg6FYME1dkb+Y9aRaeV9fMvfEcbXsvrRG/E765cRw/KdbNkdpvbnu8KSOI0PU78tP+1Yru/veHWPWXNxNCesHaM3nnFSWOPePHJJ9CFukfH7VIWhuZZY7gZUKC+3iDnY0sccAyy5HdbEHz7xZ9Rmv7iQfZMjIR64NWrHHwKXma3cjHv+MWt5cPDeWksvVjn1xOpj5HPhVuKLcnyoTI04JsGS9W3Jd41hj1KERgQdxttisut07eRybNGh1yjjUO/d/kaE3SH5PbrHKUiW4RmjPazg7bVgejSkm5M2w4i5qSjHoZ9p0haxAZOrlaYAq0sZkYjyJPlXQrBHqc6Oo1eS0l0NSz4nb3ty9zxpLZYdC6VRMZPccChP0dFmGea9yrxLjNvbcWksbaORTG+hYmjAUbZ7znxqjFixRnZo1Gpzeh7PVEC9Mry+R7aW5ihjIDElFAArSpYV90xZPW7XaRP0g4zAj2ljbpGP4XWSEsAGyBg9/uqr0WOU1Ki1anPDG02NbcZvbi4Ntd3qPFC+cRMGRsDOQRUzZFHE2oFmljPJqIxlOxG/lizG0yg9ZlGAC7jbbbnsOVcyHZkpo9DLtQcH3l/h1xePJJJda5JXjA1yHYA4O2a9Bgh6VKTVHgtfqvVpzxxdu2vgSG1+8uT55rdyo4a1LQwgCurPhkGxAHdSzi6fK9+40YNTB5I+kXZtX7jn73gfFkieYWx+TayVYyLsM7Ej0rzbzx5uWT7Xf9T6JHTSlFTx+z3e42I4oooIkC6gsYyzEZJxv8a72mWT0Sctn4Hjdfkwesz9HG1fUB+qP8ijyLVf2vExc8fwkLRR82VR7RQuS7xlOD7mgeqg8vhU55DdnxNiSxhlKGTfScrjupnii2n4HJjqckU0u8XyC3J3BPrUeNMC1GRdGFFZQwqpiLLoPZOckUksMXDk7i1a3NHJ6S9yxwu1txd3cty5wIVUFZEVyS4PZ1HwByfOs+pjGGJJe038kjvcHnLLzZJ9Pq6LfDooBxB5JGjtxjCkSpK7eRYt+QrArijuTqT8ir0k4Xd8a4cIbaPDiQNksD+Rq2clLYqxpxlZZ4Dwu5trW3iuo5F6m3KjKEKz4wPTnQtWhcl8smuo09nFZ7zpbQ5OSXdR+db1PG+hxPR6lpcxl3nF+FRSgmYSELjEK53z4+2mi6k3EGXTLJjUZPdeBU41w4ccitpNMtusW6BCCx7981VmwvI7ZRj4ktL/LxpV5/9Fe+6OLxJLMTXMoa1iESlQoyM5yaojomm3ZZLjs1soL5gQ9FlimglF1ca4ARGwZV0jfy8zVvqafVlX8byL2UvmH9GLMya5Gnc4A3lHd7KZaOAr41qKpNL4Fl+jtlLcPcTCRpXOSxbJJorSQKpcY1D6uyWLgFhEOykeOWCgNWLBjXcZ58Qzy6v5ssrY28X1FQeiL+1MsUF3FL1GSXW/zZt9GeHWvELqVJ2IjiTUQoC59tZtZP0cKS6nW4NpFqM/NNtcu+zNKfoBwe5wY5bhQCWQagwU+Irixios95LM5KjN6ScOh4Z1QtwWPKQYz7a7ekzymqZ4njHDseGsmPa+u/eY9sflVxHbxRMZJG0gaO+tcpqKuXQ5OHTZMs1CO7Z33D+i3D7ZFM6m4kx2tf1c+QrjZdbln7OyPYabgumwpOa5n5/sXpuE8PniMT20ZQjGkbCsXIubma3O5HNOMORPbp8DnOM9DolRpuHLq0jPUPufYf3rq4ddfZyL4nltdwSVOenl8P2Zx4SE7i0fB+7XS2PMtz/EP1MfNYNP8A+dERzkur+Y/Vf/GPwUSc/n8xxcelNYPRhCc+FQHIP1xPICoDkRn8Xs4eI23UXEa5zlXzup8qrnFNGvS5pYJc0Gcy/ReX+UoR6/2rM4SO1HiuPvTAHRabPJAPHOf0pVB+A0uK4q2snj6PcQQ/wbpVGCCu+DketCWOT6CrimJLeIUfRa+XneQjzCVFhn4lUuK4X9xlmHovMrq7XrEruDpp44WndlM+KxapQNyCzkjX+NcSOfEbVojsc3JmUn2YlhFK8mf270bKW76kgLDxPsoiNIPrG+z8KgOUWuoDlEJPKgTlGJVvrKKlhVo3eh2mPiM6qAC9ueQ8xWHXK4J+Z6D7PTfrEk+9fVHV2shWAAt2iB3+XKuW92ewOM4rGZpbwSucK4Yajz8MV09NSaSODxq/Vm/Bok6KJY2l+9zcOqMiYiLnYsf1x+dNrm+VRXeYfs9jeTNKcl7K/XvOusblp7RpteQScHyzXPyRSklR6tNtE0cpApXEKAMkmY1zgO25z8KlJIibZ590o4fDa8ZmWMgI+JBp8+fxrsaWTnjTfU8VxXF6DUyUej3MnTAnPJ8smtJzbmxa4P8AaPxqEqfiJT6+6mojCz4gihYoxx4t76DITQNGrKZU1x966tJPtqnURzSxNYXUu690Xad4lkTzJuPfRGXUscbDOwNNFOlfUrmlzPl6DgqDvijQm456s93uNSibiBXHI0aJTHB+7UoDQ+r7tSgUOD4EiogBAn7Ro0ChtR8TUJQ+tvGgSkMWPjS2ShBsUxGjT4Ks09w0dtLJE5XGpD5jauRxjJKOGKj1b/c9P9lMSernOfsqL/VHoSWyw2yRZLFV0ggZNYkz1T3ZyXGeBmbi0k3WJCDCqxtjZsZyPLGwrRpcvo8jlV7HN4povWsEccZVTb+VI5+6W5tr5eFxmNmlwXZN9uf5VVqXHPqotraP9s08KwZNBw2fLTm7/Poj0UwpBBDFGunSqqR4YFOnbbLFHlSROsW1LzDUc100edbW3FtK0TdacFTg8q16WHPzLyORxXVS0sYZI90vz8jjZeIW/ErkqiETJGC4YHOfXvpOEZMqc8eR34E+1mLE1i1GHp0/PdfUje3OezkehrsnjlkA+Tv9t/xVBvTInB8sU5Ux8Z86lAsfT4rUoFiwe7apSJY4U+tCiWMVz/LigSxwg76NE5hxDk4ALN5Cg6W4yuTpBSwSxadUTLq5ahjNLHLCW0WmWZMOTGlKcWkyIhjVlFSaGwaBNggDUJaCC5PMYpbjVh5ZbqtxitEUHSaFBtDYfOAB60aDsafBb17PrwjMLliBCqr9Yjw9/wADXE4opPLjqLpPc9j9mI41iytyVutu/v8A+joWvOIvcmHr5WkH1ghxj3UqhBb9x17kBdieJkFw8xYj/UNFOL6FE073MKyEbdLHaeTSp0BsjBXOBkHljYVRDm55M2ZVBYIRs9GE1rkN1sRPcdQpamTs+JKSCmVAYeRzQIcX0wuA6wRRjLBizEnA8K6uhjTbZ5vj8ubFCPizz/h09vJ0gmitpUcMmzahgknOM++qMeTFh1UpN7M0anTavV8Mx4uTtxe676SaX/h0E1tNGgd42AP2ts10MerwZcjx45W14fueVy6PNijz5IUvMh0N51p7Xh8/+jP2QQaNAHzUAydLeZuUTkf01TPUYYe1JfmaMWj1GX2MbfwD+SSDeUxIPvOBVPr2F+zb9ybNS4VqFvkqP+5pC6u3X61xk+EaE/E4oesZpexifxaXy3J6lpof1M6/4py+eyCt+okDYtbhyDjBI9+1UrNqcl9qMadeP7Gl6XR46qE52k9qWz91lhYZEAKWUSfelbP5mqnkh9/O3/t/6TL46fMleLSpecnf6tIGSUxlUlvggY7JAp/QAfGh/I5lWOUm/wAV/V/QZLUqLvPCEV15F0v/AGr6lHPacknc53351s0qjDJOKVdH8Gv3TObr5zyYcWSUnLqrfin5+TQhjNbWcoucMsRezMhBCquSwxsax6nUvE0krO1wzha1kZSnJqjT+YIxvHMdfdqCke41levlJVR1o/Z/HF2pv4pfoD8x4UD5QmAcj+CueffVHrD5Uq6ebN74f/MnO+qa6Lbautbg/MSY3nJbvOAK0+vv8PzOa/s7F/ff5IH5iUf6/wABU/iH+n5i/wCHY/5gm4GvdPn2UVxB/hB/hyP+Z8iGThhs5bS4WTUFuANh4gjPszVGXXQy9h7fE6Gh4PPR5HNSb28PM6jo00SwXEj6etMrAEcyO7FY8k4yaSZ2Ywkk20UOMl3vsMCDpG2rOPL1p4PYoyK5GJxScwyEhOsCoCUAGW9vdVuOnIWXSjsbSyjhtUcW0JfQG1kZPLcetI8jbq2WqNIyYZDLPOJ9JkAyh+rjOcflWjlVKiuzlOkZKcLklDEFp9IGslcYyRj370fSOHZXgZsmnjk5ZT+6znJeJKimMW69Z2TI5U7Hflv4VVzeRfWxf4Jdm94pb2fWuVfUCCTgYGeR5U+PP6J7Ixazh0NZGpun4nU/MjfbHwrT/EH+Ewf4f/1sopG5OYbMnHe4JqZJcv8AVz17q+tmDHj53/J0rfv5n8tkSap1O80Fup56CB/05NZ09LN/em/+TX0RqriGPfsYl/xX7yIoxGoKyXkshBJIAJx5Zb9qGmU05KGFXfV0vPzYdZLE1CebUOnFbRt21s2ui3Frs1HZid/N3x+VbeXVy+8o+5X+pzHk4bDpCUve0v0GW6KMyxQ26D+XCaiPa2azQxTnmniyZG6Se23W/A15c+PFpYZsGGK5m07XNTVVV+TBa8uHJVppCB3ZwPhTYdHp46icHFPZPffxXf7hdRxHVT0uPIptbyTrbwfd5Mjz7fM10owjH2UcSeWc/bbYjuQaya7sxjk/C0/o/kb+GdvJLD+OLXx6r9BgO17KaXZ1S/1J/Kv3Yke3oZL8Mk//AKTX6pDjGa1mBHQ8DhC2zSYHbPefD+9cHVTc8rPf8Jweh0kE+r3Zo9ny95/es+50RHyPx/vUIM2O9fjUIDgDkMVCEcxxE2nnpOPWo+hCjH24kYYxpBzivn+WThlkn8z1druDjPVyI/LS4ORt31o0s6yxYs1zRaLNwpeaYoN9WBnNew0M1LEr8Wec1Uaye9GNxedYZCWaMIEGps89+R+FbYvxMrR3Fj1kljEHUMerDLMmDq2/Oq21dosS23OfmEkvFZSkDgsFVcjdyCR+prWto7lT36HMdOF6tLOCOTaVnkIxjTsFxVc3crDy7HNXigEbDIIBx5UGIWejraOP2bffOPwmlkx4nofXDxHvqqyw5OV3lUq7lgRjBNd5aTAouMYJX5Hz/wDiGpc1OU2636gWzZgQYAIGDQ0cnPTwvw+fQnEcax6vIl0u17nv9SRdpD3AihDs6mXmk/oHJ29DCX4ZNfmrHrUc9jjlnG/+f3rn5OzrYPulFr4p2vqdXF/M4bkj+CSf57fsOFJYHBxjB9asyS5dTB+Ka+pViTnossfwtP6D4rZZzqCEMj40IzZ8BWXV8k8M4SaVpr5G3QLLDUY8kIt00+nmTQ2c0iBljIU952rly4pgmsMudOVq174uzt4uC6mM9RicGoO0m+m0k118i3LCizrHEqjSmT5k7D9ffVTyTnK7Z3ceiwY4JKC28jdhgMUSprA0jcAjn30t2akqVBBD/ufGoELSft/57qBAW8z+f7VCDdn7XxNQg3Y7229ahDCsuK2CytYvcBZ4AdaspGADjnjfnXjuIcPyxyPKlab+J6DDm9K+WKtpB8R4vw21tHke4DDYAIMkknAwPU1XpNLmyZFFItySlhjzzWxmzXVpfFJJI7nr5FDHqbqZM5H2VOOWK9hpsHJiSZ5/VZU8rroFadHOHMwluoZGB5LLcSEAea7A+3POrnS6FKO5sOJ2qQRWqFo+pjAOE7Ps91Z8maGN1JmjHhnkVxKl3xvgsV1Ctzfx27IC56xCuQx7jjyNXrIq94jxSfd0OL6eXAueMWzbaer7PoW/tTRKpdDnL4YfGc786tZUiXgH/v1lv/qY5+RquQ8T0PT98/iNVlhyig9+M+VenR8yaQ9tDI7ukaFmDcgD371g0+SGJThJ1Un189/qdbW4MmdYskIttxXRN7rYnNhd64v4JUFiCW207d+d+6sup4lpceaE+dbWn7n/AOGrR8I1uXT5MbxtXTV7bp1+j+RbHDSD/GniTO+Bk1W/tBp3/Ti5fAeH2V1bf8yUY/Meazt4erzOznILqo5L4+Vc7VcWzZHDJHFXK+/ztfU7Oj+z2LFDJjnlvnVOvJp/QnWK0XSEikb+Zi7kYHif88aGTUcRzyi5NRrfZfuX6fhXDtPGUUpS5lTt/HuonWRU0LHBGjNuDp+qviaR49Vk3y5pfoaIYdHh/pYYr4ApLdTQsU1ESnClF2UDvz/ndVMtLpYu8jv3s0xzZfuqvcZnFrz5u4beXVx2RbsANJzkEg7etU4vQubxw69xbk9Io876Gjwu6HEmicWZtyDrOrTnGNuVdPFo56duU3u/M5uPXYdWv5XRPrRujZRlWJ8dVWlosnuVh6moQEscjKkDIzvRQGPLtyI99SiWQlj3ZPoQKjRCNnbGCsmfIg0GrCcdxXoffXnEbm5i4lLHHM2oR4Laf83qqeNS6ovx55w9kpHoJfEHPFphkbNgjf30FjindDvVZGqs6rgHCE4PZJCmXffU7SZOM92TsKdtvvMySW9Gi2sZI5HxYUKYbI42dLtGOyOCjEsNvCsmtxvlUl3G3RZN3B+/8jjukNo93x6KzfOqXRHgY2Gd/hk0cVvkRfOlHJJ+LJemI1cWtu4C3XT+Nq6EdjkS6GJcAnT/AFfrVjK0ScGOjjVl49cP1pGMj0Xq18W99JQ9mFbXEpOmKOJSTzVf899Z5Qz5Pbytgx4dLi2x4kgBdk8RaGNpJJJIw+w2bBxt5b/Cs/quNTqbvY1emlyXHxLZivJNUnVuB4thAT44O4FHl0kPAl55eJLDauMNJPG7MdtOX1H0WletwQVRRPV8kt2yZbAqgz1zb6mJCpqPt/z3Vj1OveSHIopJ+8vw6dQlzNliOzRdX8MOHbL6nZ8+wbGqpcQ1D2uho6fGt6JkiwMNhT9pVCH03yazzz5Z9ZFyxxXREnUFm7JT1dmcn9KCVom/UocX4dwt4JF4pedVA5VmBdY1ypyM1r0yninGcFbXkUZ1HLBwlsn5kFtdcPKtNwu9gaEjsOsgIbx3zvXehmyZY82XqcnHpsWmj6PD0RZivY99fEY+f2xTFhIbyA7DiAz5OP3qEZHLddja6D8ttQ3pknYvPF7I0TNhQw0b/wAwGSKaiCKITrUb9/jQZEMYhzxz+7SUOQvEuOXwpGhkwBEoOQBnxpeVhtC6tS25Hwo8rBYxhTVsRt40UgMFljyY/wCdvqkIcZ9eVTKuw76f3Q+J1li0YU15wi56RrdR30ZZIirE/VL7Ds+OxNU6fTZYe1+pZl1mHLCoP+/78DM6U3dtLxO3aKVHXqgvZB3IY/vWvlcepltPoYC3sVzH1gyiq5XcjO3fjuprBRNw2e3HF7WQTdlJl1lhgKKD3Ctup3vznZf8fB76XlkNzRCh4eVwoFvEhHaIiyf+Y/pXn5anNJd/6HSWHGu4ebhvWXcE/wAo2RXUjOCQSCB2QNqz87d8xco0tkWRaQoQwbq88+yD8W3oJOXQmy7wpuIWVsgM1wipH3u+AP0q+Oh1OTdRZlnrtLjdSmr8LMm76a8CtVJF2Zf/AKY8j8XL41auFZGu00viL/EMbfZi/wAq/U5+9/8AE+3iJW04d1hHNp5wo9yhqujwpfiI9a+qRly9Oukt7kcOsokB5NFau+39TED4Vrx8Kh4NmTNxSEF2ppfEqS/THiYIub2aOM81M4TH4MfnW/Fwtx6RSOXn+0GnW3M37kCnRG5uFRL7iAZVcv8AUMjaiMfWY1sjw/8AE/yObk+0SXsQ/NnZ9HTDwizjsY+tlEakhu85Od+7FZc+NY5uKOvoNTLU4I5ZKmzbteKx9WqpbyYAG+2PjvVJtstfOKAbpJTUJzPwILu5aeIhUcL599RJWHml4foSKjyQxsWyQBtT2CgyrM4JkIAHKgyFtQpUdsewVWOgWRSD29/6TSsYrOgBzq5fdNDYO4gIzg5HuNC0ChyqZyCMelG0SjH6RtxE2bQcJhWQzKVeQMFKL3geopoyS3K8kJzTiunzMXg3RQMNXFA42BGggYPfy3p5ZE3aBixuCps0uIdGOGzx4hzbzA5EqZ2PodjSOcn1LFFIx5+g0M0xkPFJASc4EQwPeTQ5/IKiT23QyO2GI+InBOX1QruDzxvsfP4UVNk5UaH0dsP9yX8Zo+kkTkRQl45eKy6BGu3MLQ0/CtPNXKzmavjOpxNqNfkc10n6S8YiWAw30kX8XB0HGRjOPhT5dHgxZOWMdi3Q6zPqMTlOW/5HPz9KOLyqUN2wHlzPtNPDNJJqOy8gS0mKcryXL3tsn4LYfPWZb67uSynbS4/UGtODAs/am3sY9Xq5aLsYYpJ+X7UdHD0a4VE2WtutJ5mVy1alpsUX0OJk4tq5NpSr3GvFw6ztlUwW8UZ8VQVfGEV0RzpanNll25N/EmBOrGT61YVSAI7XM0EyDoTqHrRFaBF9LbS4jCkYX6w864+s/rM9vwf/APHH4/qWoeKTBRlIidI7RBz+dZkrOlJ0rJH4pMMdiP3H96NCKbYcXFJ5ZUjZY9JONs/vSrqWLobMMjC3TfuFWMCJDI2nu3oEL1soMfKkY6CkQAZFKxitNgKSAOXhQohXBHPSvuoBCUj7C+6gEIkKRhV38qlEHYgNgKKagEcsmN9I+NSiEBnYHZV+NQg/yhsfVX4/vRogPyhvsr8f3qEP/9k=' alt='tour-img'></img> 
*/
