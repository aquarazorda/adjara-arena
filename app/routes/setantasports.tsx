import SetantaBox from '~/components/setanta/SetantaBox';

const setantasports = () => {
  return (
    <div className="bg-black overflow-x-hidden pb-[128px] md:pb-[140px]">
      <div className="relative font-ABMontPro mb-24 z-[1]">
        <div
          className="splide"
          data-splide='{"perPage":1, "width": "100vw", "perMove": 1, "pagination": true, "arrows": false, "autoplay": true, "interval": 5000, "classes": { "pagination": "splide__pagination bottom-[-3.5em] flex gap-[7.5px]", "page": "splide__pagination__page bg-[#838383]" }}'
        >
          <div className="splide__track overflow-visible">
            <ul className="splide__list">
              {/* @foreach ($slide as $slideItem)
                    @php
                        $dataId = 'setanta-hero-' . $loop->index;
                    @endphp
                    <li className="splide__slide">
                        @include('web.components.setanta.hero-component', [
                            'title' => $slideItem->title,
                            'img' => cdn($slideItem->cover),
                            'date' => $slideItem->displayStartAt(),
                            'link' => setantaRoute('setanta.single', $slideItem->id),
                            'live_link' => setantaRoute('setanta.player', $slideItem->id),
                            'dataId' => $dataId,
                        ])
                    </li>
                @endforeach */}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative z-[2] max-w-[calc(1300px+2rem)] 2xl:max-w-[calc(1744px+2rem)] mx-auto px-4 text-white">
        <div className="mt-[40px]">
          <h2 className="text-[22px] font-ABMontProUpperCase font-bold mb-2 md:mb-3">ლაივი</h2>
          <div
            className="splide"
            data-splide='{"autoWidth": true, "width": "100vw", "perMove": 1, "pagination": false, "gap": 20}'
          >
            {/* @include('web.components.new.splide-arrows', ['setanta' => true]) */}
            <div className="splide__track overflow-visible">
              <ul className="splide__list">
                <SetantaBox date="2023-11-28 02:45:00" clock url="/register" />
                {/* @foreach ($live as $liveItem)
                      <li className="splide__slide">
                          @php
                              $dataId = 'setanta-live-' . $loop->index;
                          @endphp
                          @include('web.components.setanta.setanta-box', [
                              'title' => $liveItem->title,
                              'img' => cdn($liveItem->poster),
                              'date' => $liveItem->displayStartAt(),
                              'live' => true,
                              'url' => setantaRoute('setanta.player', $liveItem->id),
                              'auth' => $auth,
                              'dataId' => $dataId,
                          ])
                      </li>
                  @endforeach */}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-[40px]">
          <h2 className="text-[22px] font-ABMontProUpperCase font-bold mb-2 md:mb-3">მომავალი თამაშები</h2>
          <div
            className="splide"
            data-splide='{"autoWidth": true, "width": "100vw", "perMove": 1, "pagination": false, "gap": 20}'
          >
            {/* @include('web.components.new.splide-arrows', ['setanta' => true]) */}
            <div className="splide__track overflow-visible">
              <ul className="splide__list">
                {/* @foreach ($upcoming as $item)
                              <li className="splide__slide">
                                  @php
                                      $dataId = 'setanta-upcomming-' . $loop->index;
                                  @endphp
                                  @include('web.components.setanta.setanta-box', [
                                      'title' => $item->title,
                                      'img' => cdn($item->poster),
                                      'date' => $item->displayStartAt(),
                                      'url' => setantaRoute('setanta.single', $item->id),
                                      'live' => false,
                                      'auth' => $auth,
                                      'dataId' => $dataId,
                                  ])
                              </li>
                          @endforeach */}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-[40px]">
          <h2 className="text-[22px] font-ABMontProUpperCase font-bold mb-2 md:mb-3">მიმოხილვა</h2>
          <div
            className="splide"
            data-splide='{"autoWidth": true, "width": "100vw", "perMove": 1, "pagination": false, "gap": 20}'
          >
            {/* @include('web.components.new.splide-arrows', ['setanta' => true]) */}
            <div className="splide__track overflow-visible">
              <ul className="splide__list">
                {/* @foreach ($reviews as $review)
                              <li className="splide__slide">
                                  @include('web.components.setanta.setanta-box', [
                                      'title' => optional($review)->youtube_title,
                                      'img' =>
                                          'https://i.ytimg.com/vi/' .
                                          $review->videoId() .
                                          '/maxresdefault.jpg',
                                      'time' => optional($review)->youtube_duration,
                                      'url' => setantaRoute('setanta.highlights', $review->id),
                                      'live' => false,
                                  ])
                              </li>
                          @endforeach */}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-[40px]">
          <h2 className="text-[22px] font-ABMontProUpperCase font-bold mb-2 md:mb-3">დასრულებული</h2>
          <div
            className="splide"
            data-splide='{"autoWidth": true, "width": "100vw", "perMove": 1, "pagination": false, "gap": 20}'
          >
            {/* @include('web.components.new.splide-arrows', ['setanta' => true]) */}
            <div className="splide__track overflow-visible">
              <ul className="splide__list">
                {/* @foreach ($finished as $item)
                              <li className="splide__slide">
                                  @include('web.components.setanta.setanta-box', [
                                      'title' => $item->title,
                                      'img' => cdn($item->poster),
                                      'date' => $item->displayStartAt(),
                                      'ended' => true,
                                      'live' => false,
                                      'auth' => $auth,
                                  ])
                              </li>
                          @endforeach */}
              </ul>
            </div>
          </div>
        </div>
        {/* @include('web.components.setanta.setanta-box', [
          'title' => 'Dortmund - Copenhagen',
          'img' => 'https://www.adjarabetarena.com/assets/images/matches/slide2.jpg',
          'live' => true,
          'url' => '/',
      ])
      @include('web.components.setanta.setanta-box', [
          'title' => 'Dortmund - Copenhagen',
          'img' => 'https://www.adjarabetarena.com/assets/images/matches/slide2.jpg',
          'date' => '2023-08-06 21:07:20',
          'url' => '/',
      ])
      @include('web.components.setanta.setanta-box', [
          'title' => 'Dortmund - Copenhagen',
          'img' => 'https://www.adjarabetarena.com/assets/images/matches/slide2.jpg',
          'time' => '01:07:20',
          'url' => '/',
      ]) */}
      </div>
    </div>
  );
};

export default setantasports;
